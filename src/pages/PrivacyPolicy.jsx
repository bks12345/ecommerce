import LegalPage, { LegalSection } from "../components/layout/LegalPage";

export default function PrivacyPolicy() {
  return (
    <LegalPage title="Privacy Policy" updated="July 2026">
      <p className="text-sm text-ink-soft leading-relaxed">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Commodi iste ipsa laudantium quas magni, explicabo dignissimos, facere repellat molestias sint, laboriosam neque unde! Possimus aliquid ratione hic illo aspernatur recusandae?
      </p>

      <LegalSection heading="Information we collect">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint, quasi. Repellat culpa dolores natus eligendi nam a minus voluptatem sequi officia? Atque doloribus, assumenda delectus sit architecto facilis cumque nemo! Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illum iusto, incidunt quas facere, reiciendis rerum ad labore est omnis nihil quos doloribus iure consequatur animi perspiciatis consequuntur autem mollitia? Velit?
        </p>
      </LegalSection>

      <LegalSection heading="How we use your information">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam tempora sunt beatae earum nesciunt debitis adipisci voluptas obcaecati ipsum, quia voluptate possimus aliquam aperiam ex cum dolores cupiditate animi? Nam.
        </p>
      </LegalSection>

      <LegalSection heading="Data storage and security">
        <p>
         Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium saepe mollitia asperiores esse quis tempora qui! Consequuntur nesciunt optio error consequatur magni esse perferendis ratione dolore, nihil eum corporis atque!
        </p>
      </LegalSection>

      <LegalSection heading="Your rights">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi sit ex consequuntur necessitatibus tenetur illo blanditiis alias asperiores reiciendis officia consequatur dolor nihil, ducimus culpa impedit saepe ad? Minima, obcaecati!
        </p>
      </LegalSection>

      <LegalSection heading="Contact us">
        <p>
          Questions about this policy can be sent to{" "}
          <a href="mailto:support@daalbhat.com" className="text-basil-600 hover:text-basil-700">
            support@daalbhat.com
          </a>
          .
        </p>
      </LegalSection>
    </LegalPage>
  );
}
