> [!TIP]
> For users who doens't want to start counting at 0, please open a ticket to provide the count and your URL, and I will update it for you as soon as possible :) 

# Hits Counter

Due to the recent close down of [hits.seeyoufarm.com](https://github.com/gjbae1212/hit-counter), I decided to recreate the same service. <br>Thanks <a href="https://github.com/gjbae1212">@gjbae1212</a> for the hardworking.

## What is this?

This project allows you to create a badge like this:

![Badge](https://hitscounter.dev/api/hit?url=https%3A%2F%2Fgithub.com%2Fdonaldzou%2Fhits-counter&label=Visitor&icon=github&color=%23198754)

to record how many visit your site have!

## How to use?
Visit [Hits Counter](https://hitscounter.dev) to create your badge

![Index](https://hitscounter.dev/main_page.png)

Follow the form to input the URL, label, pick an icon and color and click **Generate**.

You should see the **Result** section below right away.

![Index](https://hitscounter.dev/result.png)

Once you're satisfied with the result, simply copy & paste the code below to your website (HTML) or Markdown file. With the URL, you can also get the JSON result of the badge by simply toggling the JSON switch under **URL**.

## Other Features

- [Historical data of your URL](https://hitscounter.dev/history)

## Self Hosting

This project allows you to self-host. Simply git clone this project, `npm install`, `npm build` and use follow instructions from the npm output.

The only manual setup is the database. This project is using Postgresql, and the application is connected to your database through `.env` file

```ini
DATABASE_URL=
DATABASE_USER=
DATABASE_PASSWORD=
DATABASE_PORT=
DATABASE=
```

### Required Datatable

#### `tracking_urls`

##### Schemas

| Column Name      | Column Types | Default       |
|------------------|--------------|---------------|
| `id`             | `UUID`       |               |
| `url`            | `VARCHAR`    |               |
| `track_datatime` | `DATE`       | `NOW()::DATE` |
| `total_hits`     | `INTEGER`    |               |
