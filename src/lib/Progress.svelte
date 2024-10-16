<!-- https://www.creative-tim.com/twcomponents/component/circular-progress-bar -->
<script>
  export let circumference;
  export let percent;
</script>

<div
  class="inline-flex items-center justify-center
  overflow-hidden rounded-full scale-75"
>
  <svg class="w-20 h-20">
    <circle
      class="text-gray-300"
      stroke-width="5"
      stroke="currentColor"
      fill="transparent"
      r="30"
      cx="40"
      cy="40"
    />
    <circle
      class="text-blue-600"
      stroke-width="5"
      stroke-dasharray={circumference}
      stroke-dashoffset={circumference - (percent / 100) * circumference}
      stroke-linecap="round"
      stroke="currentColor"
      fill="transparent"
      r="30"
      cx="40"
      cy="40"
    />
  </svg>

  <span class="absolute text-xl text-blue-700">{percent}%</span>
</div>
