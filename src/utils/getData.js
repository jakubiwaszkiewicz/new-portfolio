const API_PROJECTS_URL = process.env.REACT_APP_API_URL_PROJECTS;
const API_TOKEN = process.env.REACT_APP_API_KEY;

async function getAboutData() {
  fetch(`${API_PROJECTS_URL}/`, {
    headers: {
      "X-Auth-Token": API_TOKEN,
    },
  })
    .then((res) => res.json())
    .then((res) => {
      res.data[0].loadedImages = [];
      console.log(res);
      for (let image of res.data[0].photos) {
        let loadedImage = fetch(`https://api.flotiq.com${image.dataUrl}`, {
          headers: {
            "X-Auth-Token": API_TOKEN,
          },
        });
        let loadedImageData = loadedImage.json();
        res.data[0].loadedImages.push(loadedImageData.url);
      }
    })
    .catch((err) => console.log(err))
    .finally((res) => {
      return res;
    });
}
async function getExpData() {
  await fetch(`${API_PROJECTS_URL}/`, {
    headers: {
      "X-Auth-Token": API_TOKEN,
    },
  })
    .then((res) => res.json())
    .then((res) => {
      res.data.forEach(async (exp) => {
        exp.loadedImages = [];
        for (let image of exp.image) {
          let loadedImage = await fetch(
            `https://api.flotiq.com${image.dataUrl}`,
            {
              headers: {
                "X-Auth-Token": API_TOKEN,
              },
            }
          );
          let loadedImageData = await loadedImage.json();
          exp.loadedImages.push(loadedImageData.url);
        }
      });
    });
}
const getData = { getAboutData, getExpData };
export { getData };
