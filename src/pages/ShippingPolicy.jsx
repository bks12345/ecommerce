import LegalPage, { LegalSection } from "../components/layout/LegalPage";

export default function ShippingPolicy() {
  return (
    <LegalPage title="Shipping Policy" updated="July 2026">
      <LegalSection heading="Delivery options">
        <ul className="list-disc pl-5 flex flex-col gap-1">
          <li><strong className="text-ink">Standard Delivery</strong></li>
          <li><strong className="text-ink">Express Delivery</strong></li>
        </ul>
      </LegalSection>

      <LegalSection heading="Delivery areas">
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facilis iure recusandae voluptatibus aliquam vel, commodi expedita et nemo illum quae placeat debitis necessitatibus ea dolorum nesciunt aspernatur! Ab, magni obcaecati!
        </p>
      </LegalSection>

      <LegalSection heading="Order tracking">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi quos, blanditiis illum esse voluptatum aut harum possimus reprehenderit minima dolor itaque accusamus? Quaerat vel rem at sint eius deleniti eaque.
        </p>
      </LegalSection>

      <LegalSection heading="Missed deliveries">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti repellendus placeat odio, ullam esse ipsum expedita impedit sint nobis totam mollitia saepe odit quis voluptate doloremque illo molestias velit repellat?
        </p>
      </LegalSection>
    </LegalPage>
  );
}
