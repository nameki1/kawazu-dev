const fs = require("fs");

module.exports = async function saveImage(url, fileName, destinationPath) {
  // 保存先フォルダの作成
  if (!fs.existsSync(destinationPath)) {
    fs.mkdirSync(destinationPath, { recursive: true });
  }
  // 画像をblobで取得する
  const response = await fetch(url);
  const blob = await response.blob();

  // 画像が保存されていなければ保存する
  if (!fs.existsSync(destinationPath + fileName)) {
    const arrayBuffer = await blob.arrayBuffer();
    const binary = new Uint8Array(arrayBuffer);
    const imageBinary = Buffer.from(binary);
    fs.writeFile(destinationPath + fileName, imageBinary, (error) => {
      if (error) {
        console.log(error);
      }
    });
  }
};
