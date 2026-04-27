#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Generate all-funds.js and all-funds-full.json from akshare fund data."""
import json
import os
import re
import sys

try:
    import akshare as ak
except ImportError:
    print("akshare not installed. Please run: pip install akshare")
    sys.exit(1)


def map_category(ftype):
    t = str(ftype)
    if '股票型' in t:
        return '股票型'
    if '混合型' in t:
        return '混合型'
    if '债券型' in t:
        return '债券型'
    if '指数型' in t or 'QDII-指数' in t or 'ETF' in t:
        return '指数型'
    if 'QDII' in t:
        return 'QDII'
    if '货币型' in t:
        return '货币型'
    return None


def extract_share_class(name):
    """Extract share class suffix (A/B/C/D/E/I/H/O/R/Y/无) from fund name."""
    # Match common share class patterns at end of name
    # Priority: longer matches first (e.g. 'AB' before 'A')
    for suffix in ['AB', 'AC', 'BC', 'A', 'B', 'C', 'D', 'E', 'I', 'H', 'O', 'R', 'Y']:
        # Must end with the suffix, optionally preceded by non-digit chars
        if re.search(r'[^0-9]' + re.escape(suffix) + r'$', name):
            return suffix
    return '无'


def extract_alias(name, code):
    """Generate search aliases for a fund."""
    aliases = []

    # Extract key theme/sector keywords from name
    keywords = [
        '白酒', '新能源', '半导体', '芯片', '医药', '医疗', '消费', '科技',
        '军工', '银行', '证券', '保险', '地产', '基建', '煤炭', '钢铁',
        '有色', '化工', '农业', '养殖', '食品', '饮料', '家电', '汽车',
        '光伏', '锂电', '储能', '风电', '核电', '水电', '火电', '能源',
        '传媒', '游戏', '动漫', '影视', '互联网', '计算机', '软件',
        '通信', '电子', '5G', '人工智能', 'AI', '机器人', '智能制造',
        '沪深300', '中证500', '中证1000', '上证50', '创业板', '科创板',
        '纳斯达克', '标普', '道琼斯', '恒生', '港股', '中概',
        '黄金', '原油', '商品', 'REITs',
        '债', '信用债', '利率债', '可转债', '纯债', '短债', '长债',
        '货币', '余额宝',
        '红利', '价值', '成长', '均衡', '量化', '指数增强',
        'FOF', 'LOF', 'ETF', '联接'
    ]

    for kw in keywords:
        if kw in name:
            aliases.append(kw)

    return list(set(aliases))


def build_fund_list():
    print("Fetching fund list from akshare...")
    df = ak.fund_name_em()
    print(f"Total funds fetched: {len(df)}")

    seen = set()
    by_cat = {'股票型': [], '混合型': [], '债券型': [], '指数型': [], 'QDII': [], '货币型': []}
    aliases_map = {}  # code -> list of aliases

    for _, row in df.iterrows():
        code = str(row.iloc[0]).strip()
        name = str(row.iloc[2]).strip()
        ftype = str(row.iloc[3]).strip()
        cat = map_category(ftype)
        if not cat:
            continue
        if code in seen:
            continue
        seen.add(code)

        share_class = extract_share_class(name)
        fund_entry = {
            'code': 'of' + code,
            'name': name,
            'category': cat,
            'shareClass': share_class
        }
        by_cat[cat].append(fund_entry)

        # Build aliases
        fund_aliases = extract_alias(name, code)
        if fund_aliases:
            aliases_map['of' + code] = fund_aliases

    for cat, lst in by_cat.items():
        print(f"  {cat}: {len(lst)} funds")

    # Sample evenly from each category for lightweight JS file
    targets = {
        '股票型': 400,
        '混合型': 600,
        '债券型': 400,
        '指数型': 500,
        'QDII': 200,
        '货币型': 200,
    }
    sampled = []
    for cat, target in targets.items():
        lst = by_cat[cat]
        if len(lst) <= target:
            sampled.extend(lst)
        else:
            step = max(1, len(lst) // target)
            sampled.extend(lst[::step][:target])

    # Add ETFs from Sina
    print("Fetching ETF list from Sina...")
    try:
        etfs = ak.fund_etf_category_sina(symbol='ETF基金')
        etf_list = []
        for _, row in etfs.iterrows():
            code = str(row.iloc[0]).strip()
            name = str(row.iloc[1]).strip()
            share_class = extract_share_class(name)
            etf_entry = {'code': code, 'name': name, 'category': '指数型', 'shareClass': share_class}
            etf_list.append(etf_entry)
            # ETF aliases
            etf_aliases = extract_alias(name, code)
            if etf_aliases:
                aliases_map[code] = etf_aliases
        step = max(1, len(etf_list) // 200)
        sampled_etfs = etf_list[::step][:200]
        sampled.extend(sampled_etfs)
        print(f"  ETFs: {len(sampled_etfs)}")
    except Exception as e:
        print(f"  ETF fetch failed: {e}")

    # Deduplicate sampled by code
    deduped = []
    seen_codes = set()
    for f in sampled:
        if f['code'] not in seen_codes:
            seen_codes.add(f['code'])
            deduped.append(f)

    # Build full list (all non-duplicate funds for search)
    full_list = []
    seen_full = set()
    for cat, lst in by_cat.items():
        for f in lst:
            if f['code'] not in seen_full:
                seen_full.add(f['code'])
                full_list.append(f)
    # Add all ETFs
    try:
        etfs = ak.fund_etf_category_sina(symbol='ETF基金')
        for _, row in etfs.iterrows():
            code = str(row.iloc[0]).strip()
            name = str(row.iloc[1]).strip()
            if code not in seen_full:
                seen_full.add(code)
                share_class = extract_share_class(name)
                full_list.append({'code': code, 'name': name, 'category': '指数型', 'shareClass': share_class})
    except Exception:
        pass

    output_dir = os.path.join(os.path.dirname(__file__), '..', 'public', 'js')
    os.makedirs(output_dir, exist_ok=True)

    # Write sampled JS file (for default display)
    output_path = os.path.join(output_dir, 'all-funds.js')
    js_content = (
        '// Auto-generated mainstream fund list\n'
        f'// Generated by scripts/build-fund-list.py | Total: {len(deduped)} funds\n\n'
        'const allFunds = ' + json.dumps(deduped, ensure_ascii=False, indent=2) + ';\n'
    )
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(js_content)
    print(f"\nGenerated {output_path}: {len(deduped)} funds ({len(js_content)} bytes)")

    # Write full JSON file (for lazy-loaded search)
    full_path = os.path.join(output_dir, 'all-funds-full.json')
    with open(full_path, 'w', encoding='utf-8') as f:
        json.dump(full_list, f, ensure_ascii=False)
    print(f"Generated {full_path}: {len(full_list)} funds")

    # Write aliases JSON file
    aliases_path = os.path.join(output_dir, 'fund-aliases.json')
    with open(aliases_path, 'w', encoding='utf-8') as f:
        json.dump(aliases_map, f, ensure_ascii=False)
    print(f"Generated {aliases_path}: {len(aliases_map)} alias entries")


if __name__ == '__main__':
    build_fund_list()
