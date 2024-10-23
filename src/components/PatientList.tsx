import { usePatientStore } from "../store/store";
import PatientDetail from "./PatientDetail";

export default function PatientList() {
    const patients = usePatientStore((state) => state.patients);

    return (
        <div className="h-screen overflow-y-scroll md:w-1/2 lg:w-3/5">
            {patients.length ? (
                <>
                    <h2 className="text-3xl font-black text-center">
                        Listado de Pacientes
                    </h2>
                    <p className="mt-5 mb-10 text-xl text-center">
                        Administra tus {""}
                        <span className="font-bold text-indigo-600 ">
                            Pacientes y Citas
                        </span>
                    </p>

                    {patients.map((patient) => (
                        <PatientDetail key={patient.id} patient={patient} />
                    ))}
                </>
            ) : (
                <>
                    <h2 className="text-3xl font-black text-center">
                        {" "}
                        No hay pacientes
                    </h2>
                    <p className="mt-5 mb-10 text-xl text-center">
                        Comienza agregando pacientes {""}
                        <span className="font-bold text-indigo-600">
                            {" "}
                            y apareceran en este lugar
                        </span>
                    </p>
                </>
            )}
        </div>
    );
}
