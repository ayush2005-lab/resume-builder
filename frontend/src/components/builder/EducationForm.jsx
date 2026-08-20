import { GraduationCap } from "lucide-react";
import RepeatingGroup from "../RepeatingGroup";

export default function EducationForm({ draft, setDraft }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100">
          <GraduationCap className="text-emerald-600" size={22} />
        </div>

        <div>
          <h2 className="text-xl font-bold text-gray-800">Education</h2>
          <p className="text-sm text-gray-500">
            Add your education history.
          </p>
        </div>
      </div>

      <RepeatingGroup
        title=""
        items={draft.education}
        blank={{
          school: "",
          degree: "",
          year: "",
        }}
        onChange={(education) =>
          setDraft({
            ...draft,
            education,
          })
        }
        addLabel="Add Education"
        render={(item, onChange) => (
          <div className="rounded-xl border border-gray-200 bg-gray-50 p-5">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium">
                  School / University
                </label>

                <input
                  value={item.school}
                  onChange={(e) =>
                    onChange({
                      ...item,
                      school: e.target.value,
                    })
                  }
                  placeholder="University name"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Degree
                </label>

                <input
                  value={item.degree}
                  onChange={(e) =>
                    onChange({
                      ...item,
                      degree: e.target.value,
                    })
                  }
                  placeholder="B.Tech CSE"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-emerald-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="mb-2 block text-sm font-medium">
                Graduation Year
              </label>

              <input
                value={item.year}
                onChange={(e) =>
                  onChange({
                    ...item,
                    year: e.target.value,
                  })
                }
                placeholder="2026"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-emerald-500 focus:outline-none"
              />
            </div>
          </div>
        )}
      />
    </div>
  );
}