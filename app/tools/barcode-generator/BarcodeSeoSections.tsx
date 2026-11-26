import Image from "next/image";
import Link from "next/link";

export const barcodeFaqs: Array<[string, string]> = [
  ["Can I make a barcode for free?", "Yes. Choose Code 39 or EAN-13, enter a value and download the barcode as SVG or PNG. For example, you can make a Code 39 label for ITEM-001 or preview the sample EAN-13 value 5901234123457. Generation happens in your browser."],
  ["What is the difference between Code 39 and EAN-13?", "Code 39 can encode uppercase letters, digits, spaces and a small set of symbols, so it is useful for internal labels and asset IDs such as ITEM-001 or TOOL-27. EAN-13 encodes 13 digits and is used on many retail products; a check digit can confirm the number's arithmetic, but not that it was assigned to you."],
  ["Can this tool assign a GS1 barcode number?", "No. It draws a barcode from a number you supply; it does not issue a GS1 company prefix, allocate a GTIN or confirm that a product number is valid for retail use. The sample 5901234123457 only demonstrates the EAN-13 format. Get product identifiers through the relevant GS1 organization before using them on retail packaging."],
  ["How do I scan a barcode online?", "Open Scan barcode, choose a PNG, JPG or WebP image, or press Use camera. For example, upload a clear photo of a printed label with the complete bars and blank margins visible. Scanning requires a browser with the Barcode Detection API and supported barcode formats; availability varies by browser and device."],
  ["Are my barcode images or values uploaded?", "No. Generation and image scanning are performed in your browser. Camera access starts only after you choose Use camera, and the image is not sent to InvoiceWala."],
  ["Why was no barcode found in my image?", "The browser may not support barcode detection or that barcode type. A blurry, cropped, low-contrast or very small barcode can also be hard to read. Try a clear image showing the complete bars and quiet area."],
];

export function BarcodeSeoSections() {
  const panel = "rounded-2xl border border-white/10 bg-slate-950/80 p-5 sm:p-7";
  const paragraph = "mt-4 text-sm leading-7 text-slate-300";
  return (
    <section className="px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-6">
        <article className={panel}>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300">Barcode tool guide</p>
          <h2 className="mt-3 text-2xl font-semibold text-white">Create or scan a barcode online</h2>
          <p className={paragraph}>This free barcode generator and scanner gives you two browser-based tools in one place. Create a Code 39 barcode for an internal item code or asset label, or encode a 12- or 13-digit EAN-13 value. If you already have a printed barcode, switch to Scan barcode and choose an image or start a supported camera scan.</p>
          <p className={paragraph}>For example, a small shop might print <code className="rounded bg-white/[0.06] px-1.5 py-0.5 font-mono">ITEM-001</code> as a Code 39 label to identify a shelf item in its own inventory. The scanner reads the bars and returns that text. This is an internal label: it does not become a retail product number just because it has a barcode.</p>
          <p className={paragraph}>The generator only represents the value that you enter. It does not register a product, reserve a serial number, issue a GTIN or establish retail eligibility. If a marketplace or retailer requires a GS1 identifier, obtain the identifier through the appropriate GS1 organization before printing product packaging.</p>
        </article>

        <section className="grid gap-6 lg:grid-cols-2">
          <article className={panel}>
            <h2 className="text-2xl font-semibold text-white">Choose a barcode format for the value</h2>
            <div className="mt-5 grid gap-4">
              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                <h3 className="font-semibold text-white">Code 39 for text and internal IDs</h3>
                <p className={paragraph}>Code 39 supports uppercase letters A–Z, digits, spaces and the symbols hyphen, period, dollar, slash, plus and percent. Use it for inventory references, equipment IDs, shelf labels or other internal codes when your scanner is configured to read Code 39. For instance, entering <code className="rounded bg-white/[0.06] px-1.5 py-0.5 font-mono">TOOL-27</code> creates bars representing the text TOOL-27. This page adds the required start and stop markers automatically; an optional Mod 43 check character can add an error-checking character.</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                <h3 className="font-semibold text-white">EAN-13 for numeric product identifiers</h3>
                <p className={paragraph}>EAN-13 contains 13 digits, including a final check digit. Enter the first 12 digits and the tool calculates it; enter all 13 digits and the tool checks the last one. For the sample <code className="rounded bg-white/[0.06] px-1.5 py-0.5 font-mono">590123412345</code>, the weighted sum of the first 12 digits is 83, so the check digit is 7 and the complete example is <code className="rounded bg-white/[0.06] px-1.5 py-0.5 font-mono">5901234123457</code>. This demonstrates the calculation only; it does not verify assignment or retail eligibility.</p>
              </div>
            </div>
          </article>
          <figure className={`${panel} flex flex-col justify-center`}>
            <Image src="/images/barcode-generator/scan-label.svg" alt="Illustration of a product barcode label being read by a scanner" width={760} height={330} unoptimized className="h-auto w-full rounded-xl bg-white p-3" />
            <figcaption className="mt-4 text-sm leading-6 text-slate-400">A barcode stores a value in a pattern of bars and spaces. A compatible scanner reads the pattern and returns the encoded value.</figcaption>
          </figure>
        </section>

        <article className={panel}>
          <h2 className="text-2xl font-semibold text-white">How to make a barcode label</h2>
          <ol className="mt-5 grid gap-3 sm:grid-cols-2">
            {[
              ["1. Select a format", "Choose Code 39 for an internal text code such as TOOL-27. Choose EAN-13 when you already have a 12- or 13-digit number to encode."],
              ["2. Enter and validate the value", "For EAN-13, try the 12-digit example 590123412345: the tool adds check digit 7. If you enter 13 digits, it checks the last digit and explains when it does not match."],
              ["3. Set the print details", "Set bar height to suit your label and leave Print the value below the bars checked if people should be able to read the number without a scanner."],
              ["4. Download and verify", "Use PNG for common image workflows or SVG when you need a scalable vector file. Print one sample at its final size, then scan it with the device you plan to use before making a batch."],
            ].map(([title, body]) => <li key={title} className="rounded-xl border border-white/10 bg-white/[0.03] p-4"><h3 className="font-semibold text-white">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-400">{body}</p></li>)}
          </ol>
        </article>

        <article className={panel}>
          <h2 className="text-2xl font-semibold text-white">Tips for scanning and printing barcode images</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {[
              ["Keep the full barcode visible", "Avoid cropping the bars or removing the blank margin (quiet zone) around them. For example, leave white space at both ends instead of trimming the image tightly to the first and last bars."],
              ["Use clear contrast", "Black bars on a plain white background are the safest default for ordinary printing. Avoid glossy glare, colored backgrounds, stretching, blur or text placed across the bars."],
              ["Check size on the actual label", "A barcode that is reduced too far can become difficult to read. Print a sample at the intended size on the intended label stock, then scan it with the equipment used in your workflow."],
              ["Match the format to your scanner", "A scanner or browser may support only certain formats. Confirm the device can read the chosen symbology before producing many labels."],
            ].map(([title, body]) => <div key={title} className="rounded-xl border border-white/10 bg-white/[0.03] p-4"><h3 className="font-semibold text-white">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-400">{body}</p></div>)}
          </div>
          <p className={paragraph}>For invoice UPI collection, add a QR payment method in the <Link href="/free-invoice" className="font-semibold text-cyan-300 underline underline-offset-4">InvoiceWala invoice maker</Link>. QR codes suit links and payment details; linear barcodes suit product and inventory labels.</p>
        </article>

        <section className={panel}>
          <h2 className="text-2xl font-semibold text-white">Barcode generator and scanner FAQs</h2>
          <div className="mt-5 divide-y divide-white/10">
            {barcodeFaqs.map(([question, answer]) => <details key={question} className="py-4"><summary className="cursor-pointer font-semibold text-white">{question}</summary><p className="mt-3 text-sm leading-7 text-slate-400">{answer}</p></details>)}
          </div>
        </section>
      </div>
    </section>
  );
}
