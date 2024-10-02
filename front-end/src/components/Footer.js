import React from "react";


const Footer = () => {
  return (
        <div className="footer">
            <div className="container">
                <div className="row">
                    {/* Column - 1 */}
                    <div className="col">
                        <h4>infinite-mart</h4>
                        <p>Made with the love of our valuable customers</p>
                        <ul className="list-unstyled">
                            <li>+91 9523236648</li>
                            <li>Deoghar, Jharkhand - IN</li>
                            <li></li>
                        </ul>
                    </div>
                    {/* Column - 2 */}
                    <div className="col">
                        <h4>STUFF</h4>
                        <ul className="list-unstyled">
                            <li>STUFF 1</li>
                            <li>STUFF 2</li>
                            <li>STUFF 3</li>
                        </ul>
                    </div>
                    {/* Column - 3 */}
                    <div className="col">
                        <h4>Connect With Us</h4>
                        <ul className="list-unstyled">
                            <li>Social Media 1</li>
                            <li>Social Media 2</li>
                            <li>Social Media 3</li>
                        </ul>
                    </div>
                </div>
                <hr />
                <div className="row">
                    <p className="col-sm">
                        &copy;{new Date().getFullYear()} infinte-mart | All rights reserved | Terms of Service | Policy | Sitemap
                    </p>
                </div>
            </div>
        </div>

  );

};

export default Footer;
