/**
 * https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver#examples
 */

import template from '@/index.hbs'
import 'Styles/app.scss'

const randomHex = length => (
  '0'.repeat(length)
  + Math.floor((Math.random() * 16 ** length))
  .toString(16)
).slice(-length).toUpperCase();

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      entry.target.classList.toggle('show', entry.isIntersecting)
      if (entry.isIntersecting) observer.unobserve(entry.target)
    })
  },
  {
    rootMargin: '200px',
  }
)

const lastItemObserver = new IntersectionObserver(entries => {
  const lastItem = entries[0]
  if (!lastItem.isIntersecting) return
  loadItems()
  lastItemObserver.unobserve(lastItem.target)
  lastItemObserver.observe(document.querySelector('.item:last-child'))
})

const loadItems = () => {
  for (let j=0; j<10; j++) {
    const item = document.createElement('div')
    item.classList.add('item')
    item.style.backgroundImage = 'url(https://api.lorem.space/image/album?w=310&h=310&hash=' + randomHex(8) + ')';
    observer.observe(item)
    document.querySelector('#item-container').append(item)
  }
}

document.body.innerHTML = template()

loadItems()

const items = document.querySelectorAll('.item')

lastItemObserver.observe(document.querySelector('.item:last-child'))

items.forEach(item => {
  observer.observe(item)
})
