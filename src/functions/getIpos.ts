import puppeteer, { ElementHandle } from "puppeteer";
import { IPO } from "../types/IPO";

export async function getIPOs(
  IPO_URL: string = "https://www.chittorgarh.com/report/mainboard-ipo-list-in-india-bse-nse/83/"
): Promise<IPO[]> {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(IPO_URL);

  const newIPOs: IPO[] = [];

  const tableRows = await page.$$("table.table-bordered tbody tr");

  for (const row of tableRows) {
    const columns = await row.$$("td");

    const companyHandle: ElementHandle<Element> | null = columns[0];
    const dateHandle: ElementHandle<Element> | null = columns[2];

    if (!companyHandle || !dateHandle) {
      console.error("Failed to find company or date element");
      continue;
    }

    const companyName = await page.evaluate(
      (el: Element) => el.textContent?.trim() || "",
      companyHandle
    );
    const dateString = await page.evaluate(
      (el: Element) => el.textContent?.trim() || "",
      dateHandle
    );

    try {
      newIPOs.push({ company: companyName, date: dateString });
    } catch (error) {
      console.error(error);
    }
  }

  await browser.close();
  return newIPOs;
}
