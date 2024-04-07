const imageInput = document.getElementById('imageInput');
  const addWatermarkButton = document.getElementById('addWatermark');
  const downloadImageButton = document.getElementById('downloadImage');
  const watermarkedImage = document.getElementById('watermarkedImage');

  function drawWatermarkOnImage(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = function(e) {
        const img = new Image();
        img.onload = function() {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0);
          
          const now = new Date();
          const timestamp = now.getFullYear() + '-' +
                             ('0' + (now.getMonth() + 1)).slice(-2) + '-' +
                             ('0' + now.getDate()).slice(-2) + ' ' +
                             ('0' + now.getHours()).slice(-2) + ':' +
                             ('0' + now.getMinutes()).slice(-2) + ':' +
                             ('0' + now.getSeconds()).slice(-2);
          ctx.font = '24px Arial';
          ctx.fillStyle = 'rgba(0, 0, 0, 0.7)'; 
          ctx.fillText(timestamp, 10, canvas.height - 10); 
          canvas.toBlob(resolve, 'image/png'); 
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    });
  }

  imageInput.addEventListener('change', function(event) {
    const file = event.target.files[0];
    drawWatermarkOnImage(file).then((data) => {
      watermarkedImage.src = URL.createObjectURL(data); 
    });
  });

  downloadImageButton.addEventListener('click', function() {
    if (!watermarkedImage.src) {
      alert('请先添加水印并预览图片');
      return;
    }
    const link = document.createElement('a');
    link.href = watermarkedImage.src;
    link.download = 'watermarked-image.png';
    link.click();
  });
  function drawWatermarkOnImage(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = function(e) {
      const img = new Image();
      img.onload = function() {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        
        // 根据图片宽度动态调整字体大小
        let fontSize = canvas.width / 50; 
        if (fontSize < 12) fontSize = 70; 
        if (fontSize > 24) fontSize = 120; 
        ctx.font = `${fontSize}px Arial`;
        
        // 添加固定水印文本
        const watermarkText = "设计院路鸭煌叔";
        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)'; // 白色半透明
        const textMetrics = ctx.measureText(watermarkText);
        ctx.fillText(watermarkText, 10, canvas.height - 10 - fontSize); // 减去字体大小作为行间距
        
        // 添加当前时间
        const currentTime = new Date().toLocaleString();
        ctx.fillText(currentTime, 10, canvas.height - 10); // 在固定文本下方添加时间
        
        canvas.toBlob(resolve, 'image/png');
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
  function takePicture() {
    navigator.camera.getPicture(onPhotoDataSuccess, onFail, {
      quality: 50,
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.CAMERA,
      saveToPhotoAlbum: true
    });
  }

  function onPhotoDataSuccess(imageData) {
    var image = document.getElementById('watermarkedImage');
    image.src = "data:image/jpeg;base64," + imageData;
  }

  function onFail(message) {
    alert('Failed because: ' + message);
  }
}