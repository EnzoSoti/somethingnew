window.gradeCalculatorInitialized = window.gradeCalculatorInitialized || false;

document.addEventListener('DOMContentLoaded', function() {
    if (window.gradeCalculatorInitialized) return;
    window.gradeCalculatorInitialized = true;
    
    const form = document.getElementById('grade-form');
    const resultElement = document.getElementById('result');

    // Create modal element
    const modal = document.createElement('div');
    modal.id = 'gradeResultModal';
    modal.className = 'modal hidden fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4';
    modal.innerHTML = `
        <div class="modal-content bg-white rounded-lg shadow-xl max-w-md w-full mx-auto transform transition-all duration-300 scale-95 opacity-0">
            <div class="modal-header bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-t-lg flex justify-between items-center">
                <h3 class="text-xl font-bold">Grade Result</h3>
                <button class="close-modal text-white hover:text-gray-200 text-2xl">&times;</button>
            </div>
            <div id="modalResultContent" class="p-6">
                <!-- Modal content will be inserted here -->
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    const modalContent = document.getElementById('modalResultContent');
    const closeModalBtn = modal.querySelector('.close-modal');
    const modalContainer = modal.querySelector('.modal-content');

    // Close modal function
    function closeModal() {
        modal.classList.add('hidden');
        modalContainer.classList.remove('scale-100', 'opacity-100');
        modalContainer.classList.add('scale-95', 'opacity-0');
    }

    // Open modal function
    function openModal() {
        modal.classList.remove('hidden');
        setTimeout(() => {
            modalContainer.classList.remove('scale-95', 'opacity-0');
            modalContainer.classList.add('scale-100', 'opacity-100');
        }, 10);
    }

    // Event listeners for modal
    closeModalBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
            closeModal();
        }
    });

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
        
        let grade, remarks, gpa, gradeColor;
        
        if (weightedAverage >= 97.5 && weightedAverage <= 100) {
            grade = 'Excellent';
            gpa = '1.00';
            remarks = 'Excellent';
            gradeColor = 'text-green-600';
        } else if (weightedAverage >= 94.5 && weightedAverage < 97.5) {
            grade = 'Very Good';
            gpa = '1.25';
            remarks = 'Very Good';
            gradeColor = 'text-blue-600';
        } else if (weightedAverage >= 91.5 && weightedAverage < 94.5) {
            grade = 'Very Good';
            gpa = '1.50';
            remarks = 'Very Good';
            gradeColor = 'text-blue-600';
        } else if (weightedAverage >= 86.5 && weightedAverage < 91.5) {
            grade = 'Very Good';
            gpa = '1.75';
            remarks = 'Very Good';
            gradeColor = 'text-blue-600';
        } else if (weightedAverage >= 81.5 && weightedAverage < 86.5) {
            grade = 'Satisfactory';
            gpa = '2.00';
            remarks = 'Satisfactory';
            gradeColor = 'text-yellow-600';
        } else if (weightedAverage >= 76 && weightedAverage < 81.5) {
            grade = 'Satisfactory';
            gpa = '2.25';
            remarks = 'Satisfactory';
            gradeColor = 'text-yellow-600';
        } else if (weightedAverage >= 70.5 && weightedAverage < 76) {
            grade = 'Satisfactory';
            gpa = '2.50';
            remarks = 'Satisfactory';
            gradeColor = 'text-yellow-600';
        } else if (weightedAverage >= 65 && weightedAverage < 70.5) {
            grade = 'Fair';
            gpa = '2.75';
            remarks = 'Fair';
            gradeColor = 'text-orange-600';
        } else if (weightedAverage >= 59.5 && weightedAverage < 65) {
            grade = 'Fair';
            gpa = '3.00';
            remarks = 'Fair';
            gradeColor = 'text-orange-600';
        } else if (weightedAverage < 59.5) {
            grade = 'Failed';
            gpa = '5.00';
            remarks = 'Failed';
            gradeColor = 'text-red-600';
        } else {
            grade = 'Invalid';
            gpa = 'N/A';
            remarks = 'Invalid Score';
            gradeColor = 'text-gray-600';
        }
        
        // Determine remark color
        let remarkColor;
        switch(remarks) {
            case 'Excellent': remarkColor = 'bg-green-100 text-green-800'; break;
            case 'Very Good': remarkColor = 'bg-blue-100 text-blue-800'; break;
            case 'Satisfactory': remarkColor = 'bg-yellow-100 text-yellow-800'; break;
            case 'Fair': remarkColor = 'bg-orange-100 text-orange-800'; break;
            case 'Failed': remarkColor = 'bg-red-100 text-red-800'; break;
            default: remarkColor = 'bg-gray-100 text-gray-800';
        }
        
        // Update modal content
        modalContent.innerHTML = `
            <div class="space-y-4">
                <div class="text-center mb-4">
                    <div class="text-5xl font-bold ${gradeColor} mb-2">${weightedAverage.toFixed(2)}</div>
                    <p class="text-gray-600">Weighted Average</p>
                </div>
                
                <div class="grid grid-cols-2 gap-4">
                    <div class="bg-gray-50 p-3 rounded-lg">
                        <p class="text-sm text-gray-600">Grade</p>
                        <p class="text-xl font-bold ${gradeColor}">${grade}</p>
                    </div>
                    
                    <div class="bg-gray-50 p-3 rounded-lg">
                        <p class="text-sm text-gray-600">GPA</p>
                        <p class="text-2xl font-bold ${gpa === '5.00' ? 'text-red-600' : gpa === '1.00' ? 'text-green-600' : 'text-blue-600'}">${gpa}</p>
                    </div>
                </div>
                
                <div class="bg-gray-50 p-3 rounded-lg">
                    <p class="text-sm text-gray-600">Remarks</p>
                    <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${remarkColor} mt-1">
                        ${remarks}
                    </span>
                </div>
                
                <div class="border-t pt-4">
                    <h4 class="font-semibold text-gray-700 mb-2">Scores Breakdown:</h4>
                    <div class="space-y-2 text-sm">
                        <div class="flex justify-between">
                            <span class="text-gray-600">Prelims (20%):</span>
                            <span class="font-medium">${prelims.toFixed(2)}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Midterms (20%):</span>
                            <span class="font-medium">${midterms.toFixed(2)}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Pre-Finals (20%):</span>
                            <span class="font-medium">${prefinals.toFixed(2)}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Finals (40%):</span>
                            <span class="font-medium">${finals.toFixed(2)}</span>
                        </div>
                    </div>
                </div>
                
                <button class="close-btn w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 mt-2">
                    Close
                </button>
            </div>
        `;
        
        // Add event listener to the close button inside the modal
        const modalCloseBtn = modalContent.querySelector('.close-btn');
        if (modalCloseBtn) {
            modalCloseBtn.addEventListener('click', closeModal);
        }
        
        // Also update the original result element (for accessibility)
        resultElement.innerHTML = `
            <div class="result-container bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-4 mt-6">
                <div class="text-center">
                    <p class="text-lg">Your calculated grade is: <span class="font-bold ${gradeColor}">${weightedAverage.toFixed(2)}</span></p>
                    <p class="text-gray-600 text-sm">Click "Calculate Your Grade" again to recalculate</p>
                </div>
            </div>
        `;
        
        // Open modal
        openModal();
    });
});