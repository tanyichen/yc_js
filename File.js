	// blob图片转base64 
	/*
     * url='blob:http://localhost/fd.jpg'
     * maxwh   压缩后的宽高最长边
     * callback 返回函數
     * quality   压缩質量
     * outputFormat='image/jpeg' 圖片類型
	*/
   var outFormat={
       image:"image/jpeg",
       auto:true
   }
	function blobUrlToBase64(url, callback, OBJ={maxwh:2200, quality:1,outputFormat:false}){
		var img = new Image();
        var maxwh=OBJ.maxwh || 2200;
        var quality =OBJ.quality||1;
        var outputFormat=OBJ.outputFormat || false;
           if(outputFormat==false){
               outputFormat=OBJ.type || "image/jpeg";
           }
	  img.crossOrigin = 'Anonymous';
	  var canvas = document.createElement("canvas"),
    drawer = canvas.getContext("2d");
    img.onload = function () {
        // console.log(img)
	   var width = img.width,height = img.height,scale = width / height; 
	       if(height>maxwh || width>maxwh){
	             if(width>=height){
	                  width=maxwh;
	                  height=width/scale;
	              }else{
	                  height=maxwh;
	                  width=scale*height;
	              }
	         }
	     canvas.width = width;
	     canvas.height = width * (img.height / img.width);
	     drawer.drawImage(img, 0, 0, canvas.width, canvas.height);
	     var image=OBJ;
	     image.src=canvas.toDataURL(outputFormat, quality);
	     image.width=width;
	     image.height=height;
	     callback(image);
	 }
	  img.src = url;
	}
    /*
     * 图片压缩
     * img    原始图片
     * callback 返回函數
     * 其他配置信息可选OBJ内包含
     * maxwh   压缩后的宽高最长边
     * quality   压缩質量
     * outputFormat='image/jpeg' 圖片類型
     */
     function fileToBase64(img_url,callback,OBJ={}) {
        // console.log(img_url)
        var reader = new FileReader();
        reader.readAsDataURL(img_url);
        var img = new Image;
        reader.onload = function (e) {
            OBJ.name=img_url.name || null;
            OBJ.size=img_url.size || null;
            OBJ.type=img_url.type || null;
            if(OBJ.name){
                OBJ.suffix=OBJ.name.replace(/^.+\./,'');
            }
            blobUrlToBase64(this.result, callback,OBJ)
        }
     }
     //将base64转换为File文件
     function base64ToFile(dataurl, filename=Date.now()+'.jpg') {
         var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
         bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
         while(n--){
             u8arr[n] = bstr.charCodeAt(n);
         }
         return new File([u8arr], filename, {type:mime});
     }
export{
    blobUrlToBase64,
    base64ToFile,
    fileToBase64
}