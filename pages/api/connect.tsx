//仮置き
//最終的にAPIに書き換える

//商品情報
export interface productListType{
    id: string
    ja: string
    price: number
}
export const foodList_fast: productListType[] = [
    {
        id: "humberger",
        ja: "ハンバーガー",
        price: 480
    },
    {
        id: "sandwich",
        ja: "サンドイッチ",
        price: 380
    },
    {
        id: "friedpotato",
        ja: "フライドポテト",
        price: 190
    }
]
export const foodList_jp: productListType[] = [
    {
        id: "sushi",
        ja: "寿司",
        price: 1280
    },
    {
        id: "templa",
        ja: "天ぷら",
        price: 1280
    },
    {
        id: "noodle",
        ja: "うどん・そば",
        price: 1280
    }

]
export const hotdrink: productListType[] = [
    {
        id: "brend_coffee",
        ja: "ブレンドコーヒー",
        price: 180
    },
    {
        id: "american_coffee",
        ja: "アメリカンコーヒー",
        price: 180
    },
    {
        id: "cocoa",
        ja: "ココア",
        price: 480
    },
    {
        id: "hotmilk",
        ja: "ホットミルク",
        price: 480
    },
    {
        id: "chai",
        ja: "チャイ",
        price: 480
    },
    {
        id: "tea",
        ja: "紅茶",
        price: 280
    }
]
export const otherdrink: productListType[] = [
    {
        id: "milk",
        ja: "ミルク",
        price: 180
    },
    {
        id: "coke",
        ja: "コーラ",
        price: 190
    },
    {
        id: "beer",
        ja: "ビール",
        price: 580
    }
]
export const redfruit: productListType[] = [
    {
        id: "apple",
        ja: "りんご",
        price: 150
    },
    {
        id: "strawberry",
        ja: "いちご",
        price: 398
    }
]
export const yellowfruit: productListType[] = [
    {
        id: "banana",
        ja: "ばなな",
        price: 280
    },
    {
        id: "orange",
        ja: "みかん",
        price: 580
    }
]

//カテゴリ情報
export interface subCategoryType{
    id: string
    subCategoryJa: string
    subCategory: object[]
}
export interface categoryType{
    id: string
    ja: string
    child: subCategoryType[]
}
export const categoryList: categoryType[] = [
    {
        id: "food",
        ja: "たべもの",
        child: [{
            id: "fastfood",
            subCategoryJa: "ファストフード・軽食",
            subCategory: [foodList_fast]
        },
        {
            id: "japanese_food",
            subCategoryJa: "和食",
            subCategory: [foodList_jp]
        }]
    },
    {
        id: "fruit",
        ja: "フルーツ",
        child: [{
            id: "redfruit",
            subCategoryJa: "赤いフルーツ",
            subCategory: [redfruit]
        },
        {
            id: "yellowfruit",
            subCategoryJa: "黄色いフルーツ",
            subCategory: [yellowfruit]
        }]
    },
    {
        id: "drink",
        ja: "飲み物",
        child: [{
            id: "hotdrink",
            subCategoryJa: "ホットドリンク",
            subCategory: [hotdrink]
        },
        {
            id: "otherdrink",
            subCategoryJa: "その他",
            subCategory: [otherdrink]
        }]
    }
]

export const productTable = {
    fastfood: foodList_fast,
    japanese_food: foodList_jp,
    redfruit: redfruit,
    yellowfruit: yellowfruit,
    hotdrink: hotdrink,
    otherdrink: otherdrink
}