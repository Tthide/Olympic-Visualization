import React from 'react';
import '../styles/MainContent.css';
import Visualization from "./Visualization"

function MainContent() {
    return (
        <div className="mainContent mainContent-background">
            <div className="container-fluid">
                <div class="row">
                    <div class="col-12">
                        <Visualization />
                        
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MainContent;