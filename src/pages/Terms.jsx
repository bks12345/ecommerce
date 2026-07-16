import LegalPage, { LegalSection } from "../components/layout/LegalPage";

export default function Terms() {
  return (
    <LegalPage title="Terms & Conditions" updated="July 2026">
      <p className="text-sm text-ink-soft leading-relaxed">
       Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem repellendus eos consequatur qui soluta totam error doloribus adipisci architecto! Non illo nihil autem inventore sunt vel culpa fugit ab sequi.
      </p>

      <LegalSection heading="Using our site">
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellat odio sapiente, modi optio dolores, facilis provident nam placeat, aliquid quibusdam voluptatibus! Sint voluptatibus qui in non iusto harum. Odit, aut.
        </p>
      </LegalSection>

      <LegalSection heading="Orders and pricing">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellat corrupti deleniti quia maxime eligendi nesciunt distinctio, sapiente cumque quibusdam optio praesentium maiores doloremque aliquam inventore iste minus totam pariatur perferendis! Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit in, odio omnis quibusdam, quidem exercitationem placeat fuga facere nobis ratione corporis harum voluptate et, inventore nam error sit praesentium consequuntur.
        </p>
      </LegalSection>

      <LegalSection heading="Delivery">
        <p>
         Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum aliquid atque eveniet labore sunt nisi sint expedita, ipsum laudantium? Nesciunt aliquam facere maxime saepe aliquid fuga ab deserunt voluptates dignissimos.
        </p>
      </LegalSection>

      <LegalSection heading="Limitation of liability">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt aliquid accusantium, recusandae expedita totam laudantium facere harum veniam a quos animi id ullam officiis odit esse, blanditiis nobis, aspernatur molestias!
        </p>
      </LegalSection>

      <LegalSection heading="Changes to these terms">
        <p>
          Lorem
        </p>
      </LegalSection>
    </LegalPage>
  );
}
