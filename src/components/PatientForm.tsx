import { useForm } from "react-hook-form";
import Error from "./Error";
import { DraftPatient } from "../types";
import { usePatientStore } from "../store/store";
import { useEffect } from "react";
import { toast } from "react-toastify";

export default function PatientForm() {
    const addPatient = usePatientStore((state) => state.addPatient);
    const activeId = usePatientStore((state) => state.activeId);
    const patients = usePatientStore((state) => state.patients);
    const updatePatient = usePatientStore((state) => state.updatePatient);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
    } = useForm<DraftPatient>();

    useEffect(() => {
        if (activeId) {
            const activePatient = patients.filter(
                (patient) => patient.id === activeId
            )[0];

            setValue("name", activePatient.name);
            setValue("caretaker", activePatient.caretaker);
            setValue("date", activePatient.date);
            setValue("email", activePatient.email);
            setValue("symptoms", activePatient.symptoms);
        }
    }, [activeId, patients, reset, setValue]);

    const registerPatient = (data: DraftPatient) => {
        if (activeId) {
            updatePatient(data);
            toast("Paciente actualizado correctamente", {
                type: "success",
            });
        } else {
            addPatient(data);
            toast.success("Paciente añadido correctamente");
        }

        reset();
    };

    return (
        <div className="mx-5 md:w-1/2 lg:w-2/5">
            <h2 className="text-3xl font-black text-center">
                Seguimiento Pacientes
            </h2>

            <p className="mt-5 mb-10 text-lg text-center">
                Añade Pacientes y {""}
                <span className="font-bold text-indigo-600">Administralos</span>
            </p>

            <form
                className="px-5 py-10 mb-10 bg-white rounded-lg shadow-md"
                noValidate
                onSubmit={handleSubmit(registerPatient)}
            >
                <div className="mb-5">
                    <label
                        htmlFor="name"
                        className="text-sm font-bold uppercase"
                    >
                        Paciente
                    </label>
                    <input
                        id="name"
                        className="w-full p-3 border border-gray-100"
                        type="text"
                        placeholder="Nombre del Paciente"
                        {...register("name", {
                            required: "El nombre del paciente es obligatorio",
                            maxLength: {
                                value: 20,
                                message:
                                    "El nombre del paciente no puede exceder los 20 caracteres",
                            },
                        })}
                    />
                    {errors.name && <Error>{errors.name.message}</Error>}
                </div>

                <div className="mb-5">
                    <label
                        htmlFor="caretaker"
                        className="text-sm font-bold uppercase"
                    >
                        Propietario
                    </label>
                    <input
                        id="caretaker"
                        className="w-full p-3 border border-gray-100"
                        type="text"
                        placeholder="Nombre del Propietario"
                        {...register("caretaker", {
                            required: "El Propietario es obligatorio",
                        })}
                    />
                    {errors.caretaker && (
                        <Error>{errors.caretaker.message}</Error>
                    )}
                </div>

                <div className="mb-5">
                    <label
                        htmlFor="email"
                        className="text-sm font-bold uppercase"
                    >
                        Email
                    </label>
                    <input
                        id="email"
                        className="w-full p-3 border border-gray-100"
                        type="email"
                        placeholder="Email de Registro"
                        {...register("email", {
                            required: "El email es obligatorio",
                            pattern: {
                                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                                message: "El email no es válido",
                            },
                        })}
                    />
                    {errors.email && <Error>{errors.email.message}</Error>}
                </div>

                <div className="mb-5">
                    <label
                        htmlFor="date"
                        className="text-sm font-bold uppercase"
                    >
                        Fecha Alta
                    </label>
                    <input
                        id="date"
                        className="w-full p-3 border border-gray-100"
                        type="date"
                        {...register("date", {
                            required: "La fecha de alta es obligatoria",
                        })}
                    />
                    {errors.date && <Error>{errors.date.message}</Error>}
                </div>

                <div className="mb-5">
                    <label
                        htmlFor="symptoms"
                        className="text-sm font-bold uppercase"
                    >
                        Síntomas
                    </label>
                    <textarea
                        id="symptoms"
                        className="w-full p-3 border border-gray-100"
                        placeholder="Síntomas del paciente"
                        {...register("symptoms", {
                            required: "Los síntomas son obligatorios",
                        })}
                    ></textarea>
                    {errors.symptoms && (
                        <Error>{errors.symptoms.message}</Error>
                    )}
                </div>

                <input
                    type="submit"
                    className="w-full p-3 font-bold text-white uppercase transition-colors bg-indigo-600 cursor-pointer hover:bg-indigo-700"
                    value={activeId ? "Actualizar Paciente" : "Añadir Paciente"}
                />
            </form>
        </div>
    );
}
