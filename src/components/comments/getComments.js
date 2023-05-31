export const structureFirstComments = async () => {
    return [
        {
            id: "1",
            body: "Проверка комментариев",
            username: "Админ",
            userId: "1",
            parentId: null,
            createdAt: "2023-04-20T23:00:33.010+02:00",
        },
        {
            id: "2",
            body: "Очень хорошая статья",
            username: "Павел",
            userId: "2",
            parentId: null,
            createdAt: "2023-04-20T23:00:33.010+02:00",
        },
        {
            id: "3",
            body: "Работает",
            username: "Админ",
            userId: "1",
            parentId: "1",
            createdAt: "2023-04-20T23:00:33.010+02:00",
        },
        {
            id: "4",
            body: "Согласен",
            username: "Админ",
            userId: "2",
            parentId: "2",
            createdAt: "2023-05-25T23:00:33.010+02:00",
        },
    ];
};

export const structureEightComments = async () => {
    return [
        {
            id: "1",
            body: "Тест",
            username: "Админ",
            userId: "1",
            parentId: null,
            createdAt: "2023-04-20T23:00:33.010+02:00",
        },
    ];
};

export const sortThirdComments = async () => {
    return [];
};

export const graphSecondComments = async () => {
    return [];
};