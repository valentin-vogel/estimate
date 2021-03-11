import { useState, useEffect } from 'preact/hooks'
import { evaluate, round } from 'mathjs'
import './style'

const TYPE_CASE = 1
const TYPE_FACTOR = 2

const Wrapper = ({ children }) => {
  return (
    <div class="relative">
      <div class="fixed inset-0 bg-pattern"></div>
      <div class="relative block w-full lg:container mx-auto bg-gray-100 min-h-screen bg-opacity-70">
        <header class="fixed h-14 w-full lg:container bg-white shadow z-50">
          <a
            href="/"
            class="absolute left-6 top-0 h-14 flex items-center justify-center text-xl font-medium"
          >
            Estimate
          </a>
          <nav class="absolute right-4 top-0 h-14 text-center text-gray-500 inline-block">
            <ul class="inline-flex h-full list-none">
              <li class="float-left h-full">
                <a
                  href="https://en.wikipedia.org/wiki/Three-point_estimation"
                  class="flex items-center h-14 px-3"
                >
                  <span class="hidden sm:block">What is PERT-Estimation?</span>
                  <span class="block sm:hidden h-6 w-6">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </span>
                </a>
              </li>
              <li class="float-left h-full">
                <a
                  href="https://github.com/valentin-vogel/estimate"
                  class="flex items-center h-14 px-3"
                >
                  <span class="hidden sm:block">Github</span>
                  <span class="block sm:hidden h-6 w-6">
                    <svg
                      role="img"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                    >
                      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                    </svg>
                  </span>
                </a>
              </li>
            </ul>
          </nav>
        </header>
        <main class="relative pt-14">{children}</main>
        <footer class="h-14 bg-white text-sm text-gray-500 flex justify-center items-center">
          <span>Copyright 2021 by</span>
          <a
            class="ml-1 hover:text-gray-700"
            href="https://github.com/valentin-vogel"
          >
            Valentin Vogel
          </a>
        </footer>
      </div>
    </div>
  )
}

const EstimationItem = ({
  type,
  title,
  description,
  value,
  inputChange,
  buttonChange,
  color,
}) => {
  const factorButtons = [-1, -0.5, -0.25, -0.1, 0.1, 0.25, 0.5, 1]
  const caseButtons = [-60, -30, -10, -5, 5, 10, 30, 60]
  const buttons = type == TYPE_CASE ? caseButtons : factorButtons
  const factorStep = '0.01'
  const caseStep = '1'
  const step = type == TYPE_CASE ? caseStep : factorStep

  let textColor = 'text-gray-700'
  let bgColor = 'bg-white'
  let bgDarkColor = 'bg-gray-200'
  let borderColor = 'border-gray-200'
  switch (color) {
    case 0:
      textColor = 'text-green-700'
      bgColor = 'bg-green-200'
      bgDarkColor = 'bg-green-500'
      borderColor = 'border-green-500'
      break
    case 1:
      textColor = 'text-yellow-700'
      bgColor = 'bg-yellow-200'
      bgDarkColor = 'bg-yellow-500'
      borderColor = 'border-yellow-500'
      break
    case 2:
      textColor = 'text-red-700'
      bgColor = 'bg-red-200'
      bgDarkColor = 'bg-red-500'
      borderColor = 'border-red-500'
      break
    default:
  }

  return (
    <div
      class={`relative flex flex-col min-w-0 break-normal ${bgColor} ${textColor} box-border border ${borderColor} rounded shadow-sm`}
    >
      <div
        class={`flex flex-row items-center justify-between h-14 border-b ${borderColor} pl-4`}
      >
        <h4 class="flex-grow text-base font-medium">{title}</h4>
        <input
          class="h-full w-1/3 text-right text-base focus:outline-none bg-transparent"
          type="number"
          value={value}
          onInput={inputChange}
          step={step}
          min="0"
        />
      </div>
      {description ? (
        <div class={`p-4 border-b ${borderColor} text-sm`}>{description}</div>
      ) : null}

      <div
        class={`grid grid-cols-4 xl:grid-cols-8 gap-px text-sm ${bgDarkColor}`}
      >
        {buttons.map((value) => (
          <button
            onClick={buttonChange}
            value={value}
            class={`flex-1 p-3 ${bgColor} hover:bg-opacity-70 focus:outline-none`}
          >
            {value}
          </button>
        ))}
      </div>
    </div>
  )
}

const Estimation = () => {
  const cases = [
    {
      title: 'Best Case',
      description:
        'Minimum possible time required to accomplish an activity, assuming everything proceeds better than is normally expected.',
    },
    {
      title: 'Most likely Case',
      description:
        'Best estimate of time required to accomplish an activity, assuming everything proceeds as normal.',
    },
    {
      title: 'Worst Case',
      description:
        'Maximum possible time required to accomplish an activity, assuming everything goes wrong (but excluding major catastrophes).',
    },
  ]
  const factors = [
    { title: 'Documentation', description: '' },
    { title: 'Difficult Code Base', description: '' },
    { title: 'Meeting', description: '' },
    { title: 'Code Review', description: '' },
    { title: 'Translations', description: '' },
    { title: 'Deployment', description: '' },
    { title: 'Refactoring', description: '' },
    { title: 'Layout Customization', description: '' },
  ]
  let initialFactorValues = Array.from(new Array(factors.length), () => '0')
  let initialCaseValues = Array.from(new Array(cases.length), () => '0')
  const [factorValues, setFactorValues] = useState(initialFactorValues)
  const [caseValues, setCaseValues] = useState(initialCaseValues)
  const [result, setResult] = useState(0)

  const handleChange = (e, index, type, add) => {
    const arrayUpdate = (old) => {
      const copy = [...old]
      const final = []
      for (let i = 0; i < copy.length; i += 1) {
        if (i === index) {
          let newValue = 0
          if (!add) newValue = evaluate(`${e.target.value}`)
          if (add) newValue = evaluate(`${copy[i]} + ${e.target.value}`)
          if (newValue < 0) newValue = 0
          final.push('' + newValue)
        } else {
          final.push(copy[i])
        }
      }
      return final
    }
    if (type == TYPE_CASE) setCaseValues((old) => arrayUpdate(old))
    if (type == TYPE_FACTOR) setFactorValues((old) => arrayUpdate(old))
  }

  useEffect(() => {
    let f = factorValues.reduce((pv, cv) => evaluate(`${pv} + ${cv}`), 0)
    let r = evaluate(
      `((${caseValues[0]} + 4 * ${caseValues[1]} + ${caseValues[2]}) / 6) * (1 + ${f})`
    )
    r = round(r, 0)
    setResult(r)
  }, [caseValues, factorValues])

  return (
    <div class="grid grid-cols-6 gap-4 p-4">
      <div class="col-span-6 sm:col-span-3 md:col-span-2 space-y-4">
        <div class="relative flex flex-col min-w-0 break-normal bg-white box-border border border-gray-200 rounded shadow-sm">
          <div class="flex flex-row items-center justify-between h-14 px-4">
            <h4 class="text-base font-medium">Result</h4>
            <span class="text-base focus:outline-none">{result}</span>
          </div>
        </div>

        {cases.map((item, index) => (
          <EstimationItem
            type={TYPE_CASE}
            title={item.title}
            description={item.description}
            value={caseValues[index]}
            inputChange={(e) => handleChange(e, index, TYPE_CASE, false)}
            buttonChange={(e) => handleChange(e, index, TYPE_CASE, true)}
            color={index}
          />
        ))}
      </div>
      <div class="col-span-6 sm:col-span-3 md:col-span-4 space-y-4">
        {factors.map((item, index) => (
          <EstimationItem
            type={TYPE_FACTOR}
            title={item.title}
            description={item.description}
            value={factorValues[index]}
            inputChange={(e) => handleChange(e, index, TYPE_FACTOR, false)}
            buttonChange={(e) => handleChange(e, index, TYPE_FACTOR, true)}
          />
        ))}
      </div>
    </div>
  )
}

export default function App() {
  return (
    <Wrapper>
      <Estimation />
    </Wrapper>
  )
}
