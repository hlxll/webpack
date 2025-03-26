/**
 * 相机抓拍，使用canvas处理图片为文件流
 * 黄林-2025.3.26
 */

<template>
    <div class="startCamera" style="max-width: 200px;max-height: 200px;background-color: #ddd;margin: auto;">
      <video ref="cameraRef" autoplay playsinline muted style="width: 100%; height: 100%;"></video>
      <canvas ref="snapshotCanvas" style="display: none"></canvas>
    </div>
  </template>
  <script setup lang="ts">
  onMounted(() => {
    startCamera();
  });
  const cameraRef = ref();
  const snapshotCanvas = ref();
  const canGetCamera = ref(true)
  const startCamera = () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          cameraRef.value.srcObject = stream;
        })
        .catch((error) => {
            ElMessage({
                type: 'error',
                message:'访问摄像头失败'
            })
            cameraRef.value.remove()
            canGetCamera.value = false
        });
    } else {
      ElMessage({
        type: 'error',
        message:'该浏览器不支持'
      })
      cameraRef.value.remove()
      canGetCamera.value = false
    }
  };
  const startGetImage = () => {
    const canvas = snapshotCanvas.value;
    const video = cameraRef.value;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const context = canvas.getContext('2d');
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    return canvas.toDataURL('image/png');
  };
  defineExpose({
      startGetImage,
      canGetCamera
  });
  </script>