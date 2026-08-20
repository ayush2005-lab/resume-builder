import { Briefcase } from "lucide-react";
import RepeatingGroup from "../RepeatingGroup";

export default function ExperienceForm({ draft, setDraft }) {
  return (
    <div className="rounded-2xl bg-white border border-gray-200 shadow-sm p-6">

      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100">
          <Briefcase className="text-blue-600" size={22} />
        </div>

        <div>
          <h2 className="text-xl font-bold text-gray-800">
            Work Experience
          </h2>
          <p className="text-sm text-gray-500">
            Add your previous jobs and achievements.
          </p>
        </div>
      </div>

      <RepeatingGroup
        title=""
        items={draft.experience}
        blank={{
          company: "",
          role: "",
          dates: "",
          bullets: [""],
        }}
        onChange={(experience) =>
          setDraft({
            ...draft,
            experience,
          })
        }
        addLabel="Add Experience"
        render={(item, onChange) => (
          <div className="mb-6 rounded-xl border border-gray-200 bg-gray-50 p-5">

            <div className="grid gap-4 md:grid-cols-2">

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Company
                </label>

                <input
                  value={item.company}
                  onChange={(e) =>
                    onChange({
                      ...item,
                      company: e.target.value,
                    })
                  }
                  placeholder="Google"
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Position
                </label>

                <input
                  value={item.role}
                  onChange={(e) =>
                    onChange({
                      ...item,
                      role: e.target.value,
                    })
                  }
                  placeholder="Frontend Developer"
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100"
                />
              </div>

            </div>

            <div className="mt-4">

              <label className="mb-2 block text-sm font-medium">
                Employment Dates
              </label>

              <input
                value={item.dates}
                onChange={(e) =>
                  onChange({
                    ...item,
                    dates: e.target.value,
                  })
                }
                placeholder="Jan 2023 - Present"
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100"
              />

            </div>

            <div className="mt-4">

              <label className="mb-2 block text-sm font-medium">
                Responsibilities & Achievements
              </label>

              <textarea
                rows={5}
                value={item.bullets.join("\n")}
                onChange={(e) =>
                  onChange({
                    ...item,
                    bullets: e.target.value.split("\n"),
                  })
                }
                placeholder={`Built responsive web applications
Optimized performance
Collaborated with designers`}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100"
              />

            </div>

          </div>
        )}
      />

    </div>
  );
}