class Giphy{
    constructor(keyword){
        this.keyword = keyword;
        this.endpoint = "http://api.giphy.com/v1/gifs";
        this.api_key =  "dc6zaTOxFJmzC";
    }

    getGifUrl(callback){
        let xhr = new XMLHttpRequest();
        xhr.open("GET",`${this.endpoint}/translate?api_key=${this.api_key}&s=${this.keyword}`);
        xhr.responseType = "json";
        xhr.onload = function(){
            callback(this.response.data.images.original.mp4)
        }
        xhr.send();
    }

    static getUrlAsync(keyword, callback){
        return new Giphy(keyword).getGifUrl(callback);
    }
}

document.getElementById('txtSearch').addEventListener('keypress',function(e){
    if(e.key == "Enter"){
        let keyword = document.getElementById('txtSearch').value;
        let gif = document.getElementById('gif');
        if (keyword == '') {
            gif.src = "";
            gif.classList.remove('shadow');
        }else{
            Giphy.getUrlAsync(keyword, function(videoURL){
                gif.src = videoURL;
            });
            gif.classList.add('shadow');
        }
    }
});