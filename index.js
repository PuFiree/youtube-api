const express = require('express');

const { google } = require('googleapis');

const app = express();

app.use(express.static('public')); 

 app.use(express.json()); 

 app.use(express.urlencoded({ extended: true }));

const youtube = google.youtube({

  version: 'v3',

  auth: 'AIzaSyCg7JUctxURjRj5TTRZKHlDHgZohbl3Hko',

});

app.post('/trending', async (req, res) => {

  try {

    const { data } = await youtube.videos.list({

      part: 'snippet,statistics',

      chart: 'mostPopular',

      regionCode: req.body.ulke, // Ülke kodunu istediğiniz gibi değiştirebilirsiniz

      maxResults: req.body.videosayisi, // İstediğiniz sayıda sonuç alabilirsiniz

    });

    res.json(data.items);
    res.status(200)

  } catch (error) {

    console.error(error);

    res.status(500).send('Bir hata oluştu');

  }

});

app.listen(3000, () => {

  console.log('Sunucu çalışıyor...');

});

