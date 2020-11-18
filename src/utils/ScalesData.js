import { get_paginated_scales } from "./Client";

export const requestScalesData = (pageSize, page, sorted, filtered) => {
    const paginate_query = `[${page * (pageSize - 1)},${pageSize - 1 + page * (pageSize - 1)}]`;
    let sort_query = [];
    sorted.forEach(item => {
        sort_query.push(item.id);
        sort_query.push(item.desc ? "DESC" : "ASC");
    });

    let filter_query = [];
    filtered.forEach(item => {
        filter_query.push(`'${item.id}':'${item.value}'`);
    });

    return get_paginated_scales(paginate_query, `%5B${sort_query.map(i => `"${i}"`)}%5D`, `%7B${filter_query}%7D`).then(
        results => {
            const res = {
                rows: results,
                pages: 20 // todo: get it from header
            };
            return res;
        }
    );
};