# untis-teachers-tables
Does your school block students from viewing teachers' timetables for some reason? This is the workaround!

This gets the week's timetable for every room and then stitches those together so you only see the lessons with the teacher you're looking for. Since this makes a lot of requests very quickly you should probably limit your usage. I am not liable if your account gets banned/blocked, use at your own risk.

## How to use
```sh
git clone https://github.com/Like4Schnitzel/untis-teachers-tables
cd untis-teachers-tables
npm i
# Your login QR code's data goes in here
echo "UNTIS_QR=untis://..." > .env
npm run build
npm run preview
```

Run the above and then connect to localhost:3000 in your browser of choice.

If you don't want the (permanent!) login QR code to be stored in plaintext persistently on-disk you can also pass it to the program as an environment variable via the shell.
