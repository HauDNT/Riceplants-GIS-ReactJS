export const hideField = (data, field) => {
    return data.map(({ [field]: __reactRouterVersion, ...rest }) => rest);
}