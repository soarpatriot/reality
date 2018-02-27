


let  imageLoad = (e) => {
    var maxSize = 64;
    var imgWidth = e.detail.width;
    var imgHeight = e.detail.height;
    var ratio = imgWidth / imgHeight;
    var picSize;
    if (imgWidth >= imgHeight && imgWidth > maxSize) {
      // 如果是宽图并且宽度超过最大宽度，则以最大宽度作为最终宽度并按原始比例计算高度
      picSize = { "width": maxSize, "height": maxSize / ratio };
    } else if (imgHeight > imgWidth && imgHeight > maxSize) {
      // 如果是长图并且高度超过最大高度，则以最大高度作为最终高度并按原始比例计算宽度
      picSize = { "width": maxSize * ratio, "height": maxSize };
    } else {
      // 如果宽高都在最大限度之内则最终宽高为图片的原始尺寸
      picSize = { "width": imgWidth, "height": imgHeight };
    }

}

let previewImage = (e) => {
  const { src, group } = e.target.dataset
  const urls = group.map((i) => { return i.url })
  wx.previewImage({
    current: src,
    urls: urls,
    success: function (res) { },
    fail: function (res) { },
    complete: function (res) { },
  })
}
export { previewImage, imageLoad}

