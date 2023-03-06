//仮置き
//最終的にAPIに書き換える
export interface userType{
    id: string
    name: string
    email: string
    password: string
}

export const userList: userType[] = [
    {
        id: "1",
        name: "User1",
        email: "example@gmail.com",
        password: "1234"
    }
]