<script>
  export let percent;
</script>

<div
  class="radial-progress text-primary scale-75"
  style="--value:{percent};"
  role="progressbar"
>
  {percent}%
</div>
