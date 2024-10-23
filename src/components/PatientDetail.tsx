import { toast } from "react-toastify";
import { usePatientStore } from "../store/store";
import { Patient } from "../types";
import PatientDetailItem from "./PatientDetailItem";

type PatientDetailProps = {
    patient: Patient;
};

export default function PatientDetail({ patient }: PatientDetailProps) {
    const deletePatient = usePatientStore((state) => state.deletePatient);

    const getPatientById = usePatientStore((state) => state.getPatientById);

    const handleClick = () => {
        deletePatient(patient.id);
        toast("Paciente eliminado correctamente", {
            type: "error",
        });
    };

    return (
        <div className="p-5 mt-5 bg-white rounded-md shadow-md">
            <PatientDetailItem label="ID" data={patient.id} />
            <PatientDetailItem label="Nombre" data={patient.name} />
            <PatientDetailItem label="Propientario" data={patient.caretaker} />
            <PatientDetailItem label="Email" data={patient.email} />
            <PatientDetailItem
                label="Fecha Alta"
                data={patient.date.toString()}
            />
            <PatientDetailItem label="Sintomas" data={patient.symptoms} />

            <div className="flex flex-col justify-between gap-3 mt-10 lg:flex-row">
                <button
                    type="button"
                    className="px-10 py-2 font-bold text-white uppercase bg-indigo-600 rounded-lg hover:bg-indigo-700"
                    onClick={() => getPatientById(patient.id)}
                >
                    Editar
                </button>
                <button
                    type="button"
                    className="px-10 py-2 font-bold text-white uppercase bg-red-600 rounded-lg hover:bg-red-700"
                    onClick={handleClick}
                >
                    Eliminar
                </button>
            </div>
        </div>
    );
}
