module.exports = {
    blood: [
        { name: 'Hemoglobin', unit: 'g/dL', referenceRange: '12-16' },
        { name: 'White Blood Cells', unit: 'cells/µL', referenceRange: '4,000-11,000' },
        { name: 'Platelets', unit: 'cells/µL', referenceRange: '150,000-450,000' }
    ],
    urine: [
        { name: 'pH', unit: '', referenceRange: '4.5-8.0' },
        { name: 'Protein', unit: 'mg/dL', referenceRange: '0-20' },
        { name: 'Glucose', unit: 'mg/dL', referenceRange: '0-15' }
    ],
    xray: [
        { name: 'Findings', unit: '', referenceRange: 'Normal/Abnormal' },
        { name: 'Location', unit: '', referenceRange: 'e.g., Chest, Spine' }
    ],
    other: [
        { name: 'Custom Parameter', unit: '', referenceRange: '' }
    ]
};