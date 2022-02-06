# James Olinya's implementation of Language Learning Startup's React Native Test

> ...as seen [here](https://coda.io/d/Coding-Tests_dRAaQWPY-ZU)

# Table of Contents
- [Setup](#setup)
- [Scripts](#scripts)
- [Gotchas](#gotchas)
- [External Libraries](#external-libraries)

## Setup

1. The Project can be cloned by running the following command:

`$ git clone`

2. After the step above has run successfully, cd into the project directory and run install all dependencies like so:

```sh
$ cd /PATH/to/cloned/project

$ yarn
```
3. To run the app on iOS, you would need to navigate to the iOS folder and run install pods like so:

```sh
$ cd ios
$ pod install
```

4. Once you've done that, you can run `yarn android` or `yarn ios` to run it on Android and iOS respectively 

## Scripts

By default, 5 exercises have been seeded into my Firestore database. If however, you would like to add more exercises to those, then there's a provision for that.

1. Open the `/PATH/to/project/src/scripts/addExercises.ts` file and input your exercises in the `exercises` array provided. This just mocks the server script that will take care of adding exercise and validating that the exercises to be added are in the correct format.

2. In your terminal, run the yarn command to seed your exercises into the database like so:

```sh
$ yarn seed:exercises
```

3. Re-run the app. You should be able to see your new exercises display on the app.

## Gotchas
I noticed a few things in the course of trying this test out, and I'm going to talk about them and how I went about them.

1. I noticed there was a requirement that for the translated text, there should be a verbatim translation of each of the words in the original language. Most times however, languages are not translated directly, word for word.

Take for instance, the translation of the sentence "My brother and sister are fine" in French would be "Mon Frere et ma soeur vont bien". Notice how the two sentences are not translated word for word. In this case, a word-for-word transcription of the original sentence would fail because, for one, the number of words in the both sentences are not the same.

> Drumroll... Introducing `literallyTranslatedFrom`.

I thought it was good practise to introduce another sentence, which is the direct translation of the original sentence, from where we could map the individual words of the translated text; hence my schema...

```js
{
  text: "My brother and sister are fine",
  translation: "Mon Frere et ma soeur vont bien",
  literallyTranslatedFrom: "My brother and my sister are fine",
  match: {
    original: "brother",
    translation: "frere",
  },
  options: ["frere", "bonne", "mere", "pere"], // An array of strings
  lang: "English/German",
}
```

2. I felt the need to validate each exercise before adding it to the database. This is because the success of our database structure in this case relies heavily on the format of data we allow into it. By so doing, I:

- Checked that `translation` and the `literallTranslatedFrom` had the same amount of words.
- The `match.original` existed in the `text`
- The `match.translation` existed in `translation`
- The `match.translation` was one of the `options`



## External Libraries
1. [rn-tooltip](https://www.npmjs.com/package/rn-tooltip) by [Andreixoc](https://www.npmjs.com/~andreixoc)