import DetailMedicalInfoComponent from "../components/doctor/DetailMedicalInfoComponent";
import DetailPatientInfoComponent from "../components/doctor/DetailPatientInfoComponent";
import DetailPatientResultComponent from "../components/doctor/DetailPatientResultComponent";

const DetailPatientRecordPage = () => {
    return (
        <div className="bg-light py-5 px-5 d-none d-lg-block border-bottom shadow-sm">
            <div>
                <h1>Thông tin, kết quả khám, đơn thuốc của bệnh nhân</h1>
            </div>
            <div className="card mb-4">
                <div className="card-body">
                    <DetailPatientInfoComponent />
                </div>
            </div>
            <div className="card mb-4">
                <div className="card-body">
                    <DetailPatientResultComponent />
                </div>
            </div>
            <div className="card mb-4">
                <div className="card-body">
                    <DetailMedicalInfoComponent />
                </div>
            </div>
        </div>
    )
}

export default DetailPatientRecordPage;