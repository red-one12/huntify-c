import faqImage from '../assets/images/faq img.png'
const FAQs = () => {
  return (
    <div className="max-w-7xl mx-auto flex justify-between items-center">
      <img className='w-1/3' src={faqImage} alt="" />

      <div className="space-y-2 w-2/3">
        <div className="collapse collapse-plus bg-base-200">
          <input type="radio" name="faq-accordion" defaultChecked />
          <div className="collapse-title text-lg font-semibold">What is this platform about?</div>
          <div className="collapse-content">
            <p>It is a platform where users can discover and share tech products like Web Apps, AI tools, Software, Games, and Mobile Apps.</p>
          </div>
        </div>

        <div className="collapse collapse-plus bg-base-200">
          <input type="radio" name="faq-accordion" />
          <div className="collapse-title text-lg font-semibold">How can I submit my product?</div>
          <div className="collapse-content">
            <p>You can submit your product by creating an account and clicking on the 'Submit Product' button.</p>
          </div>
        </div>

        <div className="collapse collapse-plus bg-base-200">
          <input type="radio" name="faq-accordion" />
          <div className="collapse-title text-lg font-semibold">Is there a moderation process?</div>
          <div className="collapse-content">
            <p>Yes, products go through a moderation process before being published to ensure quality and authenticity.</p>
          </div>
        </div>

        <div className="collapse collapse-plus bg-base-200">
          <input type="radio" name="faq-accordion" />
          <div className="collapse-title text-lg font-semibold">Can I upvote products?</div>
          <div className="collapse-content">
            <p>Yes, users can upvote products based on their preference.</p>
          </div>
        </div>

        <div className="collapse collapse-plus bg-base-200">
          <input type="radio" name="faq-accordion" />
          <div className="collapse-title text-lg font-semibold">Do you offer premium features?</div>
          <div className="collapse-content">
            <p>Yes, we offer premium features through a paid subscription, including advanced analytics and featured product placements.</p>
          </div>
        </div>

        <div className="collapse collapse-plus bg-base-200">
          <input type="radio" name="faq-accordion" />
          <div className="collapse-title text-lg font-semibold">How can I contact support?</div>
          <div className="collapse-content">
            <p>You can contact support through the 'Help Desk' section on our website.</p>
          </div>
        </div>

        <div className="collapse collapse-plus bg-base-200">
          <input type="radio" name="faq-accordion" />
          <div className="collapse-title text-lg font-semibold">Is my data safe?</div>
          <div className="collapse-content">
            <p>Yes, we follow industry-standard security practices to keep your data safe and secure.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQs;
