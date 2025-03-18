import React from 'react'
import { useTranslation } from 'react-i18next';

export const Table = ({ data }) => {
    const { t } = useTranslation();
    return (
        <>
            <div className="bg-white shadow-md rounded-lg p-5 xs:w-full md:w-full lg:w-full xl:w-full overflow-x-auto">
                <h2 className="md:text-sm lg:text-lg xl:text-lg font-semibold mb-4">{t("Registered Participants List")} </h2>
                <p className="text-sm text-gray-500 mb-4">{t("Over 100 participants")} </p>
                <div className="overflow-x-auto">
                    <table className="table-auto w-full text-left text-sm">
                        <thead>
                            <tr className="border-b text-gray-500 text-left">
                                <th className="py-2">{t("Participants")} </th>
                                <th>{t("Project")}</th>
                                <th>{t("PO")}</th>
                                <th>{t("Training")}</th>


                            </tr>
                        </thead>
                        <tbody>
                            {data.map((row, index) => (
                                <tr key={index} className="border-b text-left">
                                    <td className="py-3 flex justify-start items-center space-x-3 mt-3">
                                            <p className="xs:text-xs md:text-xs lg:text-sm xl:text-lg font-thin ">{row.name}</p>
                                    </td>
                                    <td>
                                        <p className="xs:text-xs md:text-xs lg:text-sm xl:text-lg font-thin ">{row.project}</p>
                                    </td>
                                    <td>
                                        <p className="xs:text-xs md:text-xs lg:text-sm xl:text-lg font-thin ">{row.po}</p>
                                    </td>
                                    <td>
                                        <p className="xs:text-xs md:text-xs lg:text-sm xl:text-lg font-thin ">{row.company}</p>
                                    </td>
                                    {/* <td className="flex items-center pb-5">
                                        <span className={`text-xs font-normal text-white p-1.5 rounded-3xl ${row.progressColor}`}>{row.progress}</span>
                                    </td> */}

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}
