export function getImagePath(path){
    const siteUrl = document.location.origin
    const dummyImg = "https://placehold.jp/800x600.png?text=dummy"

    const imgPath = path
        ? siteUrl+'/assets/images/'+path
        : dummyImg
    return imgPath
}