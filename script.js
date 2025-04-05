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
        } else if (weightedAverage >= 88.5 && weightedAverage < 91.5) {
            grade = 'Very Good';
            gpa = '1.75';
            remarks = 'Very Good';
        } else if (weightedAverage >= 85.5 && weightedAverage < 88.5) {
            grade = 'Satisfactory';
            gpa = '2.00';
            remarks = 'Satisfactory';
        } else if (weightedAverage >= 81.5 && weightedAverage < 85.5) {
            grade = 'Satisfactory';
            gpa = '2.25';
            remarks = 'Satisfactory';
        } else if (weightedAverage >= 77.5 && weightedAverage < 81.5) {
            grade = 'Satisfactory';
            gpa = '2.50';
            remarks = 'Satisfactory';
        } else if (weightedAverage >= 73.5 && weightedAverage < 77.5) {
            grade = 'Fair';
            gpa = '2.75';
            remarks = 'Fair';
        } else if (weightedAverage >= 69.5 && weightedAverage < 73.5) {
            grade = 'Fair';
            gpa = '3.00';
            remarks = 'Fair';
        } else if (weightedAverage < 69.5) {
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
    
    // kulay based sa grade
    function getToastBackgroundColor(grade) {
        switch(grade) {
            case 'Excellent':
                return "linear-gradient(to right, #00b09b, #96c93d)";
            case 'Very Good':
                return "linear-gradient(to right, #56ab2f, #a8e063)";
            case 'Satisfactory':
                return "linear-gradient(to right, #2193b0, #6dd5ed)";
            case 'Fair':
                return "linear-gradient(to right, #f46b45, #eea849)";
            case 'Failed':
                return "linear-gradient(to right, #cb2d3e, #ef473a)";
            default:
                return "linear-gradient(to right, #8e9eab, #eef2f3)";
        }
    }
});