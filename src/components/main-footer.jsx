import React from 'react';
import '../layout/footer.css';


function MainFooterComponent() {
    return (
        <div className="footer">
            <p>
                <span>
                    {/* <img src={ require('../static/images/icon/beian.png') } alt="备案" /> */}
                    <a taget="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=44011102003303">粤公网安备 44011102003303号</a>
                </span>
                <span>
                    <a taget="_blank" href="https://beian.miit.gov.cn/">粤ICP备2022147750号</a>
                </span>
            </p>
        </div>
    )
}

export default MainFooterComponent;