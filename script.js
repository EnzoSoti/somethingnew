window.gradeCalculatorInitialized = window.gradeCalculatorInitialized || false;

document.addEventListener('DOMContentLoaded', function() {
    if (window.gradeCalculatorInitialized) return;
    window.gradeCalculatorInitialized = true;
    
    const form = document.getElementById('grade-form');
    const resultElement = document.getElementById('result');

    const newForm = form.cloneNode(true);
    form.parentNode.replaceChild(newForm, form);
    
    newForm.addEventListener('submit', function(e) {
        e.preventDefault(); 
        
        // Get the input values
        const prelims = parseFloat(document.getElementById('prelims').value) || 0;
        const midterms = parseFloat(document.getElementById('midterms').value) || 0;
        const prefinals = parseFloat(document.getElementById('prefinals').value) || 0;
        const finals = parseFloat(document.getElementById('finals').value) || 0;
        
        // Calculate the weighted average (based on percentages)
        // Prelims (20%), Midterms (20%), Pre-Finals (20%), Finals (40%)
        const weightedAverage = (prelims * 0.2) + (midterms * 0.2) + (prefinals * 0.2) + (finals * 0.4);
        
        let grade, remarks, gpa;
        
        if (weightedAverage >= 97.5 && weightedAverage <= 100) {
            grade = 'Excellent';
            gpa = '1.00';
            remarks = 'Excellent';
        } else if (weightedAverage >= 94.5 && weightedAverage < 97.5) {
            grade = 'Very Good';
            gpa = '1.25';
            remarks = 'Very Good';
        } else if (weightedAverage >= 91.5 && weightedAverage < 94.5) {
            grade = 'Very Good';
            gpa = '1.50';
            remarks = 'Very Good';
        } else if (weightedAverage >= 86.5 && weightedAverage < 91.5) {
            grade = 'Very Good';
            gpa = '1.75';
            remarks = 'Very Good';
        } else if (weightedAverage >= 81.5 && weightedAverage < 86.5) {
            grade = 'Satisfactory';
            gpa = '2.00';
            remarks = 'Satisfactory';
        } else if (weightedAverage >= 76 && weightedAverage < 81.5) {
            grade = 'Satisfactory';
            gpa = '2.25';
            remarks = 'Satisfactory';
        } else if (weightedAverage >= 70.5 && weightedAverage < 76) {
            grade = 'Satisfactory';
            gpa = '2.50';
            remarks = 'Satisfactory';
        } else if (weightedAverage >= 65 && weightedAverage < 70.5) {
            grade = 'Fair';
            gpa = '2.75';
            remarks = 'Fair';
        } else if (weightedAverage >= 59.5 && weightedAverage < 65) {
            grade = 'Fair';
            gpa = '3.00';
            remarks = 'Fair';
        } else if (weightedAverage < 59.5) {
            grade = 'Failed';
            gpa = '5.00';
            remarks = 'Failed';
        } else {
            grade = 'Invalid';
            gpa = 'N/A';
            remarks = 'Invalid Score';
        }
        
        // Display result
        resultElement.innerHTML = `
            <div class="result-container ${grade.toLowerCase().replace(' ', '-')}">
                <h3>Grade Result</h3>
                <p>Weighted Average: <strong>${weightedAverage.toFixed(2)}</strong></p>
                <p>GPA: <strong>${gpa}</strong></p>
                <p>Remarks: <strong>${remarks}</strong></p>
            </div>
        `;
        
        // notification
        Toastify({
            text: `Grade calculated: ${weightedAverage.toFixed(2)} (${gpa} - ${remarks})`,
            duration: 3000,
            gravity: "top", 
            position: "right", 
            backgroundColor: getToastBackgroundColor(grade),
            stopOnFocus: true, 
            onClick: function(){} 
        }).showToast();
        
    });
    
    // Updated color scheme to match HTML's blue-purple theme
    function getToastBackgroundColor(grade) {
        switch(grade) {
            case 'Excellent':
                // Deep blue to purple gradient (matching the main theme)
                return "linear-gradient(to right, #3b82f6, #8b5cf6)";
            case 'Very Good':
                // Blue to lighter purple gradient
                return "linear-gradient(to right, #2563eb, #7c3aed)";
            case 'Satisfactory':
                // Blue gradient (matching the primary blue in HTML)
                return "linear-gradient(to right, #1d4ed8, #3b82f6)";
            case 'Fair':
                // Purple to orange gradient (using the purple from HTML)
                return "linear-gradient(to right, #7c3aed, #f59e0b)";
            case 'Failed':
                // Red gradient but with purple undertones to match theme
                return "linear-gradient(to right, #dc2626, #b91c1c)";
            default:
                // Gray gradient matching the neutral tones in HTML
                return "linear-gradient(to right, #6b7280, #9ca3af)";
        }
    }
});