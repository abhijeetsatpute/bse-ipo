# BSE IPO Web Scraper

BSE IPO Web Scraper is an npm package designed to scrape data about Initial Public Offerings (IPOs) and their Grey Market Premiums (GMPs) from Chittorgarh's website. It provides two main functions, `getIPOs()` and `getGMPs()`, to retrieve IPO and GMP data respectively. This project is written in TypeScript.

## Installation

To install BSE IPO Web Scraper, use npm:

```bash
npm install bse-ipo
```

## Usage

Here's an example of how you can use the package in your TypeScript project::

```bash
import { getIPOs, getGMPs, IPO, GMP } from "bse-ipo";

const main = async () => {
  try {
    const IPOs: IPO[] = await getIPOs();
    const GMPs: GMP[] = await getGMPs();

    // Do something with the IPO and GMP data
    console.log("IPOs:", IPOs);
    console.log("GMPs:", GMPs);
  } catch (error) {
    console.error("An error occurred:", error);
  }
};

main();
```

## Contributing

Contributions are welcome! If you encounter any issues, have feature requests, or would like to contribute code, please feel free to submit a pull request or open an issue on GitHub.

## License

BSE IPO Web Scraper is licensed under the [MIT License](https://github.com/abhijeetsatpute/bse-ipo/blob/main/LICENSE.md). See the LICENSE.md file for details.

## Support

For any questions, feedback, or support requests, please contact [abhijeetsatpute98@gmail.com].
