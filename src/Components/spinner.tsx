import React from "react";

export default function LoadingSpinner() {
    return (
        <div className="spinner-container">
            <div className="loading-spinner">
            </div >
            <p style={{
                color: "gold",
                marginTop: '3vh',
                fontSize: "20px"
            }}>Loading ...</p>

        </div>
    );
}