This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
# install
yarn
# run
yarn dev
```

- [Project Backlog on Notion](https://www.notion.so/piccollage/c6e7e9be1fed40439003957f0355b46b?v=288146b83c244bd4a95cd9953921712f&pvs=4)
- [Figma file](<https://www.figma.com/file/3xIeVE3fQs2WWUWGXr1QVP/23BC3-AI-Transfer-(on-WEB)-(this-one)?type=design&node-id=12338%3A259727&mode=design&t=iXTi6uwoM4QOTBKb-1>)

## ENV File

```bash
# .env
NEXT_PUBLIC_TESTING_AMPLITUDE_KEY=YOUR_TEST_KEY
NEXT_PUBLIC_TESTING_GA_TRACKING_ID=YOUR_TEST_KEY

NEXT_PUBLIC_HOPTER_API_KEY=WEB_API_KEY
```

## Style Transfer API

- API endpoint: https://serving.hopter.picc.co/api/v1/services/style-transfer-explorer/predictions
- `WEB_API_KEY`:
  ```
  eyJhbGciOiJBMjU2R0NNS1ciLCJlbmMiOiJBMjU2R0NNIiwiaXYiOiJYbk5TUzM1SVMwOE84Z04tIiwidGFnIjoidmllYjFvR0lCRFZuU1UyRGxZaXpZQSJ9.6JWQYstyjmYioNnXgPd4oB6LTi-BmQD0qB2U1yUQ72U.QldQBrW2aI_JfV_d.4I9ynw9D7rqCDeE3qNDgb6xySh5kXbNIDCCkQZFobLm0LlmM-LdhYcPwKO1V5bw8besHSLigbGVsfZNdHZOvzTI-_tX8t6u5j_a8wDbM-9qx6q1NbY0MiEMK7weblnBB1_2EDW4jnscl-A3DxYlW5E3itG2rfRcePLtrLqSz2DrlqYxsJXQHF4du3BJ360_UZn6lZqXEyNwIVb5JvHX_DcfnUl1YL0PfT4coEndJdtNb.Sv2kAiRX7TRuchZjlT-2pg
  ```

## Style List

- File: `src/utils/styleList.ts`
- [Notion page](https://www.notion.so/piccollage/Style-List-df7113fef0ae4580a5b663672f8b9e18?pvs=4)

## Dependencies

- UI component library: [Radix UI](https://www.radix-ui.com/)
- CSS-in-JS: [pandacss](https://panda-css.com/)
- State management: [Zustand](https://zustand-demo.pmnd.rs/)
- Animation related: [Lottie](https://github.com/chenqingspring/react-lottie), [GSAP](https://gsap.com/)
