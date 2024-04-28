import puppeteer, { ElementHandle } from "puppeteer";
import { GMP } from "../types/GMP";

export async function getGMPs(
  GMP_URL: string = "https://www.investorgain.com/report/live-ipo-gmp/331/"
): Promise<GMP[]> {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(GMP_URL);

  const IPO_GMPs: GMP[] = [];

  const tableRows = await page.$$(
    "table.table-bordered.table-striped tbody tr"
  );

  for (const row of tableRows) {
    // ADS: if row has class .fullview skip
    const isFullView = await row.evaluate((row) =>
      row.classList.contains("fullview")
    );
    if (isFullView) continue;

    const columns = await row.$$("td");

    const IPO_handle: ElementHandle<Element> | null = columns[0];
    const GMP_handle: ElementHandle<Element> | null = columns[2];
    const EST_handle: ElementHandle<Element> | null = columns[3];
    const RATING_handle: ElementHandle<Element> | null = columns[4];
    const IPO_START_handle: ElementHandle<Element> | null = columns[7];
    const IPO_DATE_handle: ElementHandle<Element> | null = columns[8];
    const GMP_DATE_handle: ElementHandle<Element> | null = columns[1];

    const IPO = await page.evaluate(
      (el: Element) => el.textContent?.trim() || "",
      IPO_handle
    );
    const GMP = await page.evaluate(
      (el: Element) => el.textContent?.trim() || "",
      GMP_handle
    );
    const EST = await page.evaluate(
      (el: Element) => el.textContent?.trim() || "",
      EST_handle
    );
    const RATING = await page.evaluate((el: Element) => {
      const img = el.querySelector("img");
      if (img) {
        const title = img.getAttribute("title");
        return title ? title.split(" ")[1].split("/5")[0] : 0;
      }
      return "";
    }, RATING_handle);
    const IPO_START_DATE = await page.evaluate(
      (el: Element) => el.textContent?.trim() || "",
      IPO_START_handle
    );
    const IPO_END_DATE = await page.evaluate(
      (el: Element) => el.textContent?.trim() || "",
      IPO_DATE_handle
    );
    const GMP_DATE = await page.evaluate(
      (el: Element) => el.textContent?.trim() || "",
      GMP_DATE_handle
    );

    try {
      IPO_GMPs.push({
        IPO,
        GMP,
        EST,
        RATING: Number(RATING),
        IPO_START_DATE,
        IPO_END_DATE,
        GMP_DATE,
      });
    } catch (error) {
      console.error(error);
    }
  }

  await browser.close();
  return IPO_GMPs;
}
