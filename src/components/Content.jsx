import React, { useEffect, useState } from "react";
import { TbChecks } from "react-icons/tb";
import { HiOutlineClipboard } from "react-icons/hi";
import { LuClipboardCheck } from "react-icons/lu";
import Input from "./Input";
import "../App.css";
import bg from "../assets/bg.png";
import DatePicker from "./DatePicker";

const Content = () => {

  const DEFAULT_INPUT = {
    izin: "",
    kepada: "",
    nama: "",
    namaWali: "",
    namaGuru: "",
    tanggal: "",
    kelas: "",
    nim: "",
  };

  const status = ["siswa", "kuliah"];
  const [isStatusActive, setisStatusActive] = useState(null);
  const [copyMessage, setCopyMessage] = useState("");
  const [inputs, setInputs] = useState(DEFAULT_INPUT);

  useEffect(() => {
    const getData = localStorage.getItem("sopandikit");
    if (getData) {
      const parsedData = JSON.parse(getData);
      setInputs(parsedData.input);
      setisStatusActive(parsedData.status);
    } else {
      localStorage.setItem("sopandikit", JSON.stringify({ status: null, input: DEFAULT_INPUT }));
    }
  }, []);

  const setLocalStorage = (data, type) => {
    const prevData = localStorage.getItem("sopandikit");
    if (prevData) {
      const parsedData = JSON.parse(prevData);
      if (type === "status") {
        parsedData.status = data.status;
      } else {
        parsedData.input = { ...parsedData.input, ...data };
      }
      localStorage.setItem("sopandikit", JSON.stringify(parsedData));
    }
  };

  const handleCopy = () => {
    const textToCopy = content[isStatusActive].text.join("\n");
    navigator.clipboard.writeText(textToCopy).then(
      function () {
        setCopyMessage("Teks disalin!");
        setTimeout(() => {
          setCopyMessage("");
        }, 2000);
      },
      function (err) {
        setCopyMessage("Gagal menyalin teks.");
      }
    );
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setLocalStorage({ [name]: value }, "input");
  };
  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setLocalStorage({ [name]: value }, "input");
  };
  const handleSetisStatusActive = (data) => {
    setisStatusActive(data);
    setLocalStorage({ status: data }, "status");
  };

  const time = new Date();
  const formatTime = (time) => {
    let hours = time.getHours().toString().padStart(2, "0");
    let minutes = time.getMinutes().toString().padStart(2, "0");
    return `${hours}.${minutes}`;
  };

  function formatDateIndonesian(dateString) {
    if (!dateString) return "";
    const date = new Date(dateString);
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    return new Intl.DateTimeFormat("id-ID", options).format(date);
  }

  const content = [
    {
      title: "siswa",
      text: `Assalamualaikum, selamat pagi 
Yth. Bapak/Ibu guru wali kelas ${inputs.kelas ? inputs.kelas : "[KELAS]"},
Perkenalkan saya ${inputs.namaWali ? inputs.namaWali : "[NAMA WALI]"
        } selaku wali murid atas nama ${inputs.nama ? inputs.nama : "[NAMA MURID]"
        }, dengan ini saya menyampaikan bahwa pada hari ini ${inputs.tanggal ? formatDateIndonesian(inputs.tanggal) : "[TANGGAL]"
        }, anak saya tidak dapat mengikuti kegiatan pembelajaran seperti biasa dikarenakan ${inputs.izin ? inputs.izin : "[ALASAN]"
        }.
Demikian surat izin ini kami sampaikan, atas perhatian dan kebijaksanaan bapak/ibu guru, kami ucapkan terima kasih.
Wassalamualaikum Wr. Wb.

Hormat kami
Wali Murid

${inputs.namaWali ? inputs.namaWali : "[NAMA WALI]"}`.split("\n"),
    },
    {
      title: "kuliah",
      text: `Assalamu'alaikum warahmatullahi wabarakatuh.

Dengan hormat, saya mahasiswa yang bernama :
Nama :  ${inputs.nama ? inputs.nama : "[NAMA]"}
NIM : ${inputs.nim ? inputs.nim : "[NIM]"}
      
Memberitahukan bahwa pada hari ini ${inputs.tanggal ? formatDateIndonesian(inputs.tanggal) : "[TANGGAL]"
        }, saya memohon izin tidak dapat mengikuti kegiatan perkuliahan dikarenakan ${inputs.izin ? inputs.izin : "[ALASAN]"
        }.
      
Atas perhatiannya saya ucapkan terima kasih
      
Wasalamualaikum Warahmatullah Wabarakatuh.`.split("\n"),
    },
  ];

  return (
    <div className="w-full flex justify-center mt-10 gap-10 md:px-20 px-5 items-center md:items-start flex-col md:flex-row ">
      <div className="w-full md:w-1/2">
        <ul className="flex gap-5 ">
          {status.map((item, index) => (
            <li
              className={`${isStatusActive === index
                ? "border-2 border-green-400 bg-green-400 text-white"
                : "border-2 border-slate-300"
                } px-3 py-2 rounded-md cursor-pointer w-32 flex justify-center  transition-all duration-200`}
              key={index}
              onClick={() => handleSetisStatusActive(index)}
            >
              {item}
            </li>
          ))}
        </ul>

        {isStatusActive === 0 ? (
          <>
            <Input
              label={"Nama Anak"}
              name="nama"
              onChange={handleInputChange}
              value={inputs.nama}
              labelClass="mt-5 mb-2 uppercase font-semibold text-sm text-slate-500"
            />
            <Input
              label={"kelas"}
              name="kelas"
              onChange={handleInputChange}
              value={inputs.kelas}
              labelClass="mt-5 mb-2 uppercase font-semibold text-sm text-slate-500"
            />
            <Input
              label={"Alasan Izin"}
              name="izin"
              onChange={handleInputChange}
              value={inputs.izin}
              labelClass="mt-5 mb-2 uppercase font-semibold text-sm text-slate-500"
            />
            <Input
              label={"Nama Wali"}
              name="namaWali"
              onChange={handleInputChange}
              value={inputs.namaWali}
              labelClass="mt-5 mb-2 uppercase font-semibold text-sm text-slate-500"
            />
            <DatePicker
              label="Tanggal Izin"
              labelClass="mt-5 mb-2 uppercase font-semibold text-sm text-slate-500"
              name="tanggal"
              onChange={handleDateChange}
              value={inputs.tanggal}
            />
          </>
        ) : (
          <>
            <Input
              label={"Nama"}
              name="nama"
              onChange={handleInputChange}
              value={inputs.nama}
              labelClass="mt-5 mb-2 uppercase font-semibold text-sm text-slate-500"
            />
            <Input
              label={"Nim"}
              name="nim"
              onChange={handleInputChange}
              value={inputs.nim}
              labelClass="mt-5 mb-2 uppercase font-semibold text-sm text-slate-500"
            />
            <DatePicker
              label="Tanggal Izin"
              name="tanggal"
              onChange={handleDateChange}
              value={inputs.tanggal}
              labelClass="mt-5 mb-2 uppercase font-semibold text-sm text-slate-500 w-full"
            />
            <Input
              label={"Alasan Izin"}
              name="izin"
              onChange={handleInputChange}
              value={inputs.izin}
              labelClass="mt-5 mb-2 uppercase font-semibold text-sm text-slate-500"
            />
          </>
        )}
        <button
          onClick={handleCopy}
          className={`mt-5 px-4 py-2 rounded-lg ${copyMessage
            ? "bg-green-500 text-white"
            : "bg-white border-2 border-slate-300 border-inherit text-slate-800 hover:bg-slate-200"
            }   transition-all  flex gap-2 items-center`}
        >
          {copyMessage ? (
            <>
              <LuClipboardCheck />
              {copyMessage}
            </>
          ) : (
            <>
              <HiOutlineClipboard />
              Salin Teks
            </>
          )}
        </button>
      </div>
      {isStatusActive === null ? (
        <div className=" relative rounded-md mt-2 h-72 w-full transition-all duration-200 bg-slate-700">
          <img
            src={bg}
            alt="bg"
            className="w-full h-full object-cover absolute"
          />
        </div>
      ) : (
        content.map(
          (item, index) =>
            isStatusActive === index && (
              <div key={index} className="w-full">
                <div className="flex relative rounded-md transition-all duration-200 mt-2 justify-end min-h-72 w-full bg-slate-700 overflow-hidden">
                  <img
                    src={bg}
                    alt="bg"
                    className="w-full h-full object-cover absolute transition-all duration-200"
                  />
                  {isStatusActive !== null && (
                    <div
                      className={`chat-bubble  w-64 md:w-7/12 p-2 bg-[#D9FDD3] mt-10  mb-10 mr-5 rounded-lg rounded-tr-[0px] ${isStatusActive === index ? "slide-up-enter" : ""
                        }`}
                    >
                      <div className="break-words mb-3 text-sm">
                        {item.text.map((line, idx) => (
                          <React.Fragment key={idx}>
                            {line}
                            <br />
                          </React.Fragment>
                        ))}
                      </div>
                      <div className=" justify-end text-[#64C5E8] flex gap-2 items-center">
                        <p className="text-slate-500 text-xs">{`${formatTime(
                          time
                        )}`}</p>
                        <TbChecks />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )
        )
      )}
    </div>
  );
};

export default Content;
