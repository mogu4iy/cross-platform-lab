export const ACTIONS = {
    'choose_language': {
        regex: /chooseLang_.+/,
        action: (data: object) => `chooseLang_${JSON.stringify(data)}`,
        parse: (data: string) => JSON.parse(data.replace("chooseLang_", ""))
    },
};