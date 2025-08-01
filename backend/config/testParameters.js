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
        { name: 'Chest X-Ray', unit: '', referenceRange: 'Normal/Abnormal' },
        { name: 'Spine X-Ray', unit: '', referenceRange: 'Normal/Abnormal' }
    ],
    ultrasound: [
        { name: 'Abdominal Ultrasound', unit: '', referenceRange: 'Normal/Abnormal' },
        { name: 'Obstetric Ultrasound', unit: '', referenceRange: 'Normal/Abnormal' }
    ],
    ecg: [
        { name: 'Electrocardiogram (ECG)', unit: '', referenceRange: 'Normal/Abnormal' },
        { name: 'Heart Rate', unit: 'bpm', referenceRange: '60-100' }
    ]
};
