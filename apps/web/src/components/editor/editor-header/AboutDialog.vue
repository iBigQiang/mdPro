<script setup lang="ts">
const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits([`close`])

function onUpdate(val: boolean) {
  if (!val) {
    emit(`close`)
  }
}

const links = [
  { label: `强子优化版mdPro仓库`, url: `https://github.com/iBigQiang/mdPro` },
  { label: `原版doocs的Github仓库`, url: `https://github.com/doocs/md` },
]

function onRedirect(url: string) {
  window.open(url, `_blank`)
}
</script>

<template>
  <Dialog :open="props.visible" @update:open="onUpdate">
    <DialogContent>
      <DialogHeader>
        <DialogTitle>关于</DialogTitle>
      </DialogHeader>
      <div class="text-center">
        <h3>mdPro是一款高度简洁的微信 Markdown 编辑器</h3>
        <p>扫码关注公众号【强子手记】，更新技术内容第一时间推送！</p>
        <img
          class="mx-auto my-5"
          src="./WXGZH_QQ88667178.png"
          alt="mdPro Markdown 编辑器"
          style="width: 80%"
        >
      </div>
      <DialogFooter class="sm:justify-evenly flex flex-wrap gap-2">
        <Button
          v-for="link in links"
          :key="link.url"
          @click="onRedirect(link.url)"
        >
          {{ link.label }}
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
